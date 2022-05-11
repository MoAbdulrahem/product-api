<?php
namespace classes;

class Furniture extends Product {
    // additional attrs for furniture
    private $height;
    private $width;
    private $length;

    public function __construct($product){
        // assigning child class attrs
        $this->setSku($product->sku);
        $this->setName($product->name);
        $this->setPrice($product->price);
        $this->setHeight($product->height);
        $this->setWidth($product->width);
        $this->setLength($product->length);
        $this->setType('furniture');
        $this->setTable('furniture'); 
    }

    public function insert():bool{
        $this->conn = \config\Database::getConnection();
        // retrieving the sku of the inserted product
        $id = $this->insertIntoProductTable();
        if ($id === -1){
            // Insertion failed due to Integrity Constraint Violation
            return false;
        }
        // inserting into the furniture table
        $sql = "INSERT INTO furniture (id, height, width, length) 
        VALUES (:id, :height, :width, :p_length);";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'height' => $this->height,
            'width' => $this->width,
            'p_length' => $this->length
            ]);
        return true;
    }

    // getters and setters
    public function getHeight(): int {return $this->height;}
    public function getWidth(): int {return $this->width;}
    public function getLength(): int {return $this->length;}

    public function setHeight($height) {$this->height = $height;}
    public function setWidth($width) {$this->width = $width;}
    public function setLength($length) {$this->length = $length;}
}
