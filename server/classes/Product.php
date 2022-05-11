<?php
namespace classes;

abstract class Product {
    // product attrs
    private $sku;
    private $name;
    private $price;
    private $type;

    // db & connection
    private $db;
    private $conn;

    // database table name
    private $table;
    protected static $parent_table = 'product';

    // retrieve a list of all products currently in database
    public static function getAllProducts() : string{
        $conn = \config\Database::getConnection();
        $sql = "SELECT p.sku, p.name, p.price, b.weight, d.size, f.length, f.width, f.height
                FROM product p 
                LEFT JOIN book b on p.id = b.id
                LEFT JOIN dvd d on p.id = d.id
                LEFT JOIN furniture f on p.id = f.id";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $products = $stmt->fetchAll();
        return json_encode($products);

    }

    // retrieve a single product
    public static function getSingleProduct($sku): Product{
        $conn = \config\Database::getConnection();
        $sql = "SELECT * FROM product WHERE sku = :sku;";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['sku' => $sku]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        return $product;
    }

    // delete a product
    public static function delete(int $sku) {
        $conn = \config\Database::getConnection();
        $sql = "DELETE FROM product WHERE sku = :sku";
        $stmt = $conn->prepare($sql);
        $stmt->execute(['sku'=>$sku]);
    }

    // insert a product into the general product table and return its sku
    public function insertIntoProductTable(): int{
        /**
         * Insert is done over 2 steps, first, a product in inserted in the products table,
         * then we retrieve the sku of that product and use it to insert in furniture table
         */
        try{
            $this->conn = \config\Database::getConnection();
            // query
            $sql = "INSERT INTO product (sku, name, price) VALUES (:sku, :p_name, :price);
                    SELECT LAST_INSERT_ID() AS id;";

            $stmt = $this->conn->prepare($sql);
            $stmt->execute([
                'sku' => $this->getSku(),
                'p_name' => $this->getName(),
                'price'  => $this->getPrice()
            ]);
            // retrieving the id of the inserted product
            return $this->conn->lastInsertId();
        }
        catch (\PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                // Integrity constraint violation due to duplicate sku
                return -1;
            }
        }
    }

    // insert a product into the type-specific db table
    abstract public function insert();

    // getters and setters
    public function getSku() : string { return $this->sku; }
    public function getType() : string { return $this->type; }
    public function getTable() : string { return $this->table; }
    public function getName() : string { return $this->name; }
    public function getPrice(): int{ return $this->price ;}
    public function setSku($sku) { $this->sku = $sku;}
    public function setName($name) { $this->name = $name;}
    public function setPrice($price) { $this->price = $price;}
    public function setType($type) { $this->type = $type;}
    public function setTable($table) { $this->table = $table;}
    
}
