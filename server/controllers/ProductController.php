<?php
namespace controllers;

class ProductController {
    // the model (of type Product)
    private $model;
    // a list of all products
    private $products;
    // a connection to the database
    private $conn;

    public function __construct(){}

    // getters
    public static function getProducts(){
        return \classes\Product::getAllProducts();
    }

    // insert product
    public static function insertProduct($product):bool{
        return $product->insert();
    }

    // delete multiple products
    public static function deleteProducts(array $list){
        foreach($list as $sku){
            \classes\Product::delete($sku);
        }
    }
}
