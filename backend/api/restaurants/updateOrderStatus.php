<?php 
    // Imports
    include_once '../../config/Database.php';
    
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // init DB & connect
    $database = new Database();
    $database->connect();  

     // get params from request
    $id = isset($_GET['ID']) 
       ? $_GET['ID'] 
       : die(http_response_code(404));

    // Create and execute query 
    $query = "UPDATE OrderInformation SET OrderStatus_ID = '1' WHERE OrderInformation_ID = :ID";
    $bindvars = [[":ID", $id]];

    $result = $database->execute($query, $bindvars);

    // init response variable containing query result
    $response = count($result) > 0 
    ? $result[0] // query succeeded, specified orders found
    : die(http_response_code(404)); // query failed, No orders were found

    // return response in JSON format
    echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    // disconnect from DB
    $database->disconnect();


?>