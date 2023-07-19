<?php
class Database
{


    private $host = 'localhost';
    private $port = 3306;
    private $dbname = 'MaaserApp';
    private $user = 'root';
    private $pass = 'root';
    private $charset = 'utf8mb4';
    protected $connection = null;
    public function __construct()
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $this->connection = new mysqli($this->host, $this->user, $this->pass, $this->dbname, $this->port);
            $this->connection->set_charset($this->charset);
            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    public function query($query = "", $params = [])
    {
        try {

            $stmt = $this->executeStatement($query, $params);
            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }
    private function executeStatement($query = "", $params = [], $types = "")
    {
        try {
            $stmt = $this->connection->prepare($query);
            if ($stmt === false) {
                throw new Exception("Unable to do prepared statement: " . $query);
            }
            if ($params) {
                $types = $types ?: str_repeat("s", count($params));
                $stmt->bind_param($types, ...$params);
            }
            $stmt->execute();
            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
