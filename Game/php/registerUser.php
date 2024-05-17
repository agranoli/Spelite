<?php

include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Register extends Database {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function registerUser() {
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['username'], $decodedData['email'], $decodedData['password'])) {
            // Extract user data from request
            $username = $this->conn->real_escape_string(trim($decodedData['username']));
            $email = $this->conn->real_escape_string(trim($decodedData['email']));
            $password = $this->conn->real_escape_string(trim($decodedData['password']));
            $coins = 0;
            $premium_coins = 0;

            // Validate empty fields
            if (empty($username) || empty($email) || empty($password)) {
                echo json_encode(["message" => "All fields are required.", 'status' => 400]);
                return;
            }

            $checkUsernameSql = "SELECT id FROM users WHERE username = '$username'";
            $checkUsernameResult = $this->conn->query($checkUsernameSql);

            if ($checkUsernameResult && $checkUsernameResult->num_rows > 0) {
                echo json_encode(["message" => "Username already exists. Please choose a different one.", 'status' => 409]);
                return;
            }

            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $token = bin2hex(random_bytes(16));

            // Default avatar URL
            $defaultAvatarUrl = "https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?s=612x612&w=0&k=20&c=LJWadbs3B-jSGJBVy9s0f8gZMHi2NvWFXa3VJ2lFcL0=";

            // Check if avatar URL is provided, otherwise use default
            $avatarUrl = isset($decodedData['avatarUrl']) && !empty($decodedData['avatarUrl']) ? $this->conn->real_escape_string(trim($decodedData['avatarUrl'])) : $defaultAvatarUrl;

            // Insert the new user into the database
            $insertSql = "INSERT INTO users (username, email, password, coins, premium_coins, avatarURL, token) VALUES ('$username', '$email', '$hashedPassword', '$coins', '$premium_coins', '$avatarUrl', '$token')";
            $insertResult = $this->conn->query($insertSql);

            if ($insertResult) {
                // Registration successful, return the token in the response
                echo json_encode(["message" => "User registered successfully.", "token" => $token, 'status' => 200]);
            } else {
                echo json_encode(["message" => "Failed to register user.", 'status' => 500]);
            }
        } else {
            echo json_encode(["message" => "Invalid data received", 'status' => 400]);
        }
    }
    public function updateUserPlane() {
        $decodedData = json_decode($this->rawData, true);

        if ($decodedData !== null && isset($decodedData['token'], $decodedData['selected_plane'])) {
            // Decode the token to extract user information
            $decodedToken = $this->decodeToken($decodedData['token']);

            if (!$decodedToken || !isset($decodedToken['user_id'])) {
                echo json_encode(["message" => "Invalid token", 'status' => 400]);
                return;
            }

            $user_id = $decodedToken['user_id'];
            $selected_plane = $this->conn->real_escape_string(trim($decodedData['selected_plane']));

            // Update the user's selected plane in the database
            $updateSql = "UPDATE users SET plane = '$selected_plane' WHERE id = '$user_id'";
            $updateResult = $this->conn->query($updateSql);

            if ($updateResult) {
                echo json_encode(["message" => "Plane updated successfully.", 'status' => 200]);
            }
        } else {
            echo json_encode(["message" => "Invalid data received", 'status' => 400]);
        }
    }
}

$register = new Register();
$register->registerUser();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $register->registerUser();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['update_plane'])) {
    $register->updateUserPlane();
} else {
    echo json_encode(["message" => "Invalid request method", 'status' => 405]);
}

?>
