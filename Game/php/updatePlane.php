<?php
include "db.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

class UpdatePlane extends Database {
    public function updatePlane($userId, $selected_plane) {
        $sql = "UPDATE Users SET plane = ? WHERE id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ii", $selected_plane, $userId);

        if ($stmt->execute() === TRUE) {
            return json_encode(["message" => "Plane updated successfully"]);
        } else {
            return json_encode(["error" => "Error updating plane: " . $this->conn->error]);
        }
    }
}

$updatePlane = new UpdatePlane();

// Assuming you are sending userId and selected_plane via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['userId'], $data['selected_plane'])) {
        echo $updatePlane->updatePlane($data['userId'], $data['selected_plane']);
    } else {
        echo json_encode(["error" => "Missing parameters"]);
    }
}
?>
