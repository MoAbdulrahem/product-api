<?php
namespace classes;

class Dvd extends Product {
    // additional attrs for furniture
    private $size;

    public function __construct($product){
        // assigning child class attrs
        $this->setSku($product->sku);
        $this->setName($product->name);
        $this->setPrice($product->price);
        $this->setSize($product->size);
        $this->setType('dvd');
        $this->setTable('dvd'); 
    }

    // overridden function from Product
    public function insert(){
        $this->conn = \config\Database::getConnection();
        // retrieving the sku of the inserted product
        $id = $this->insertIntoProductTable();
        if ($id === -1){
            // Insertion failed due to Integrity Constraint Violation
            return false;
        }

        // inserting into the dvd table
        $sql = "INSERT INTO dvd (id, size) 
        VALUES (:id, :size);";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'size' => $this->size,
        ]);
        return true;
    }

    // setters and getters
    public function getSize():int {return $this->size;}
    public function setSize($size) {$this->size = $size;}
}
