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
    $restaurant_address = isset($_GET['RestaurantAddress']) 
       ? $_GET['RestaurantAddress'] 
       : die(http_response_code(404));

    // Create and execute query 
    $query = "SELECT * FROM 
    (OrderContainsMenuItems om1 
    INNER JOIN OrderInformation oi1 WHERE RestaurantAddress = :RestaurantAddress)
    WHERE NOT DXISTS (
    (SELECT m.MenuItemName FROM MenuItemsMadeAt m WHERE RestaurantAddress = :RestaurantAddress)
    EXCEPT
    (SELECT om2.MenuItemName FROM OrderContainsMenuItems om2 
    INNER JOIN OrderInformation oi2 WHERE oi2.CustomerPhoneNumber = oi1.CustomerPhoneNumber))";
    $bindvars = [[":RestaurantAddress", $restaurant_address]];

    $result = $database->executeFetchAll($query, $bindvars);

    // init response variable containing query result
    $response = count($result) > 0 
    ? $result // query succeeded, specified orders found
    : die(http_response_code(404)); // query failed, No orders were found

    // return response in JSON format
    echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    // disconnect from DB
    $database->disconnect();


?>