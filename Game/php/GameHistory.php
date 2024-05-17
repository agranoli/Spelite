<?php
include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class UserGameHistory extends Database {
    public function __construct() {
        parent::__construct();
    }

    public function GetUserGameHistory($userID)
    {
        $items = [];

        $sql = "SELECT score, date FROM Games WHERE playerID = ? ORDER BY date DESC";
        $stmt = $this->conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("i", $userID);
            $stmt->execute();
            $result = $stmt->get_result();

            while ($row = $result->fetch_assoc()) {
                $items[] = $row;
            }
            $stmt->close();
        } else {
            error_log("Error preparing statement: " . $this->conn->error);
        }
        return json_encode($items);
    }
}

$data = json_decode(file_get_contents("php://input"), true);
if (isset($data['userID'])) {
    $getUserGameHistory = new UserGameHistory();
    $result = $getUserGameHistory->GetUserGameHistory($data['userID']);
    echo $result;
} else {
    echo json_encode(["error" => "userID not provided"]);
}
