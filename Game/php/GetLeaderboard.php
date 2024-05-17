<?php
include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
class TopScores extends Database {
    public function __construct() {
        parent::__construct();
    }
    public function GetLeaderboard()
    {
        $items = [];

        $sql = "SELECT playerID, score, date FROM Games ORDER BY score DESC";
        $stmt = $this->conn->prepare($sql);
        if ($stmt) {
            $stmt->execute();
            $result = $stmt->get_result();

            while ($row = $result->fetch_assoc()) {
                $sql = "SELECT username FROM Users WHERE ID = ?";
                $stmtUser = $this->conn->prepare($sql);
                if ($stmtUser) {
                    $stmtUser->bind_param("i", $row['playerID']);
                    $stmtUser->execute();
                    $resultUser = $stmtUser->get_result();
                    $user = $resultUser->fetch_assoc();
                    $row['username'] = $user['username'];

                    $items[] = $row;

                    $stmtUser->close();
                } else {
                    error_log("Error preparing statement: " . $this->conn->error);
                }
            }
            $stmt->close();
        } else {
            error_log("Error preparing statement: " . $this->conn->error);
        }
        return json_encode($items);
    }
}

$getScores = new TopScores();
$result = $getScores->GetLeaderboard();
echo $result;