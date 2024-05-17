<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include "db.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    header("Access-Control-Allow-Credentials: true");
    http_response_code(200);
    exit();
}

class UserData extends Database {
    private $session_id;

    public function __construct() {
        parent::__construct();
        session_start();
        $this->session_id = session_id();
    }

    public function getUserData() {
        if (isset($_GET['token'])) {
            $token = $_GET['token'];
        }

        $sql = "SELECT id, username, avatarUrl, coins, premium_coins FROM Users WHERE token = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $userData = $result->fetch_assoc();

            // Now that user is authenticated, fetch game data
            $gamesData = $this->fetchGamesData($userData['id']); // Pass user ID here
            $userData['gamesData'] = $gamesData;
            echo json_encode($userData);
        } else {
            http_response_code(404); // Not Found
            echo json_encode(["error" => "User not found"]);
        }
    }

    // Function to fetch game data for a specific user
    private function fetchGamesData($userId) {
        $sql = "SELECT score, date FROM Games WHERE playerID = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        $gamesData = [];

        while ($row = $result->fetch_assoc()) {
            $gamesData[] = $row;
        }

        return $gamesData;
    }

    public function updateUserData($data) {
        $token = $data['token'];
        $username = $data['username'];
        $password = $data['password'];
        $confirmPassword = $data['confirmPassword'];
        $avatar = $data['avatar'];

        $sql = "SELECT id FROM Users WHERE token = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $userId = $result->fetch_assoc()['id'];

            // Update username and avatar
            $updateFields = "username = ?, avatarUrl = ?";
            $params = [$username, $avatar];

            // Check if password is provided and matches the confirmation
            if (!empty($password) && $password === $confirmPassword) {
                $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
                $updateFields .= ", password = ?";
                $params[] = $hashedPassword;
            } elseif (!empty($password)) {
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "Password confirmation does not match"]);
                return;
            }

            // Prepare SQL
            $sql = "UPDATE Users SET $updateFields WHERE id = ?";
            $params[] = $userId;

            $stmt = $this->conn->prepare($sql);

            // Bind parameters dynamically
            $types = str_repeat('s', count($params) - 1) . 'i';
            $stmt->bind_param($types, ...$params);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Profile updated successfully"]);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(["error" => "Failed to update profile"]);
            }
        } else {
            http_response_code(404); // Not Found
            echo json_encode(["error" => "User not found"]);
        }
    }
}

// Instantiate the UserData class
$userData = new UserData();

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // If it's a GET request, fetch user data
    $userData->getUserData();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // If it's a POST request, update user data
    $data = json_decode(file_get_contents("php://input"), true);
    $userData->updateUserData($data);
}
?>
