<?php

namespace config;
use PDO;

class Database
{
    // db connection
    private $conn = null;
    // Sigleton instance
    private static $instance = null;

    // get or create a singleton instance
    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    // pervent cloning
    private function __clone(){}


    private function __construct() {
        // database parameters
        $db_name  = 'scandiweb';
        $host     = 'localhost';
        $username = 'mohamed';
        $password = '123456';
        try {
            // data resource name
            $dsn = "mysql:host=$host;dbname=$db_name";
            $this->conn = new PDO($dsn, $username, $password);

            // setting PDO attributes
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            // $this->conn->setAttribute(PDO::ATTR_PERSISTENT, true);
        } catch (PDOException $e){
            echo 'Error connecting to the database: '. $e->getMessage();
        }
    }

    // get database connection
    public static function getConnection(){
        try {
            $db = self::getInstance();
            return $db->conn;
        } catch (Exception $e) {
            echo 'Error connecting to the database: ' . $e->getMessage();
            return null;
        }
    }
}