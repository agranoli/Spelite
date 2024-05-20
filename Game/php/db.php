<?php

class Database {
    private $host = "localhost";
    private $username = "root";
    private $password = "root";
    private $database = "Runner";
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        return $this->conn;
    }

    public function getConnection() {
        return $this->conn;
    }
}
