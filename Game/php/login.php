<?php
include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class Login extends Database {
    private $rawData;

    public function __construct() {
        parent::__construct();
        $this->rawData = file_get_contents('php://input');
    }

    public function loginData() {
        if ($this->rawData !== false && !empty($this->rawData)) {
            $decodedData = json_decode($this->rawData, true);

            if ($decodedData !== null && isset($decodedData['username'], $decodedData['password'])) {
                $username = $this->conn->real_escape_string(trim($decodedData['username']));
                $password = $this->conn->real_escape_string(trim($decodedData['password']));

                // Validate empty fields
                if (empty($username) || empty($password)) {
                    echo json_encode(["message" => "Username and password are required.", 'status' => 400]);
                    return;
                }

                $sql = "SELECT id, username, password FROM Users WHERE username = '$username'";

                $result = $this->conn->query($sql);

                if ($result && $result->num_rows === 1) {
                    $row = $result->fetch_assoc();
                    $hashedPassword = $row['password'];

                    if (password_verify($password, $hashedPassword)) {
                        // Generate a token
                        $token = bin2hex(random_bytes(32));
                        $userId = $row['id'];

                        // Store the token in the database
                        $updateSql = "UPDATE Users SET token = ? WHERE id = ?";
                        $stmt = $this->conn->prepare($updateSql);
                        $stmt->bind_param("si", $token, $userId);
                        $updateResult = $stmt->execute();

                        if ($updateResult) {
                            unset($row['password']);
                            echo json_encode([
                                "message" => "Successfully logged in.",
                                'status' => 200,
                                'user' => $row,
                                'token' => $token,
                            ]);
                        } else {
                            echo json_encode([
                                "message" => "Failed to log in.",
                                'status' => 403
                            ]);
                        }
                    } else {
                        echo json_encode(["message" => "Incorrect username or password", 'status' => 401]);
                    }
                } else {
                    echo json_encode(["message" => "User not found", 'status' => 404]);
                }
            } else {
                echo json_encode(["message" => "Invalid data received", 'status' => 400]);
            }
        } else {
            echo json_encode(["message" => "No data received", 'status' => 400]);
        }
    }
}

$login = new Login();
$login->loginData();
?>
