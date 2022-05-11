<?php
namespace utility;

// a simple factory for creating different kinds of products
class ProductFactory{

    public static function createProduct($product) {
        $products = [
            'book' => new \classes\Book($product),
            'furniture' => new \classes\Furniture($product),
            'dvd' => new \classes\Dvd($product)
        ];
        return $products[$product->type];
    }
}