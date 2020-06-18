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
    $menu_item_name = isset($_GET['MenuItemName'])
        ? $_GET['MenuItemName']
        : die(http_response_code(404));
    
    $restaurant_address = isset($_GET['RestaurantAddress'])
        ? $_GET['RestaurantAddress']
        : die(http_response_code(404));

    $cost = isset($_GET['Cost'])
        ? $_GET['Cost']
        : die(http_response_code(404));

    $description = isset($_GET['Description'])
        ? $_GET['Description']
        : die(http_response_code(404));
    
    $averagepreptime = isset($_GET['AveragePrepTime'])
        ? $_GET['AveragePrepTime']
        : die(http_response_code(404));
        
    
    // Create & execute query
    $query = "INSERT INTO MenuItemsMadeAt VALUES(
        ?, ?, ?, ?, ?)";
    $bindvars = [$menu_item_name, $restaurant_address, $cost, $description, $averagepreptime];

    // Execute Query 
    $database->execute($query, $bindvars);

    // disconnect from DB
    $database->disconnect();

?>