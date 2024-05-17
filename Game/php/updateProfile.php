<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include "db.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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

    public function updateUserProfile() {
        $requestData = json_decode(file_get_contents("php://input"), true);

        if (!isset($requestData['token'])) {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Token not provided"]);
            return;
        }

        $token = $requestData['token'];

        $sql = "SELECT id FROM Users WHERE token = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows !== 1) {
            http_response_code(404); // Not Found
            echo json_encode(["error" => "User not found"]);
            return;
        }

        $userId = $result->fetch_assoc()['id'];

        $updateFields = [];
        $updateParams = [];
        $updateTypes = '';

        if (isset($requestData['username'])) {
            $updateFields[] = "username = ?";
            $updateParams[] = $requestData['username'];
            $updateTypes .= 's';
        }

        if (isset($requestData['password'])) {
            $hashedPassword = password_hash($requestData['password'], PASSWORD_DEFAULT);
            $updateFields[] = "password = ?";
            $updateParams[] = $hashedPassword;
            $updateTypes .= 's';
        }

        if (isset($requestData['avatar'])) {
            $updateFields[] = "avatar = ?";
            $updateParams[] = $requestData['avatar'];
            $updateTypes .= 's';
        }

        if (!empty($updateFields)) {
            $updateParams[] = $userId;
            $updateTypes .= 'i';
            $sql = "UPDATE Users SET " . implode(', ', $updateFields) . " WHERE id = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param($updateTypes, ...$updateParams);
            if ($stmt->execute()) {
                echo json_encode(["success" => "Profile updated successfully"]);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(["error" => "Failed to update profile"]);
            }
        } else {
            echo json_encode(["error" => "No fields to update"]);
        }
    }
}

$database = new UserData();
$database->updateUserProfile();
?>
