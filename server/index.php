<?php
require_once 'autoload.php';

//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET,POST,DELETE");
header("Access-Control-Allow-Headers: Accept,Content-Type,Cache-Control");

switch ($_SERVER["REQUEST_METHOD"]){

        case ("POST"):
        // both insertion and deletion is done via POST method as 000webhosting
        // does not support DELETE requests

        // Get the JSON contents
        $json = file_get_contents('php://input');
        // decode the json data
        $data = json_decode($json);
        if($data->name ){
        // Insert request
        echo $data->type;
        $product = \utility\ProductFactory::createProduct($data);
            if (\controllers\ProductController::insertProduct($product)){
                // echo json_encode(["status" => "success"]);
                 http_response_code(200);
            } else{
                echo json_encode(["status" => "failed"]);
                 http_response_code(400);
            }
        } else if(($data->product_list)) {
            // delete request
            \controllers\ProductController::deleteProducts($data->product_list);

        }
    case ("GET"):
        echo \controllers\ProductController::getProducts();
}
