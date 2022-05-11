<?php
namespace classes;

class Book extends Product {
    // additional attrs for furniture
    private $weight;

    public function __construct($product){
        // assigning child class attrs
        $this->setSku($product->sku);
        $this->setName($product->name);
        $this->setPrice($product->price);
        $this->setWeight($product->weight);
        $this->setType('book');
        $this->setTable('book');        
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

        // inserting into the book table
        $sql = "INSERT INTO book (id, weight) 
        VALUES (:id, :weight);";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'weight' => $this->weight,
        ]);
        return true;
    }

    // setters and getters
    public function getWeight():int {return $this->weight;}
    public function setWeight($weight) {$this->weight = $weight;}
}
