<?php
    // Imports
    include_once '../../config/Database.php';
    
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With, Accept, Access-Control-Request-Method');

    // needed to prevent CORS errors from occuring when requests are made from browser
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      return 0;
    }

    // init DB & connect
    $database = new Database();
    $database->connect();

    $restaurantaddress = isset($_GET['RestaurantAddress']) 
    ? $_GET['RestaurantAddress']
    : die(http_response_code(404));

    $restaurantaddress = urldecode($restaurantaddress);
    
    $query = "SELECT MenuItem_Name, MenuItem_Cost, MenuItem_Description, MenuItem_AveragePrepTime
    FROM MenuItemsMadeAt
    WHERE Restaurant_Address = :RestaurantAddress";

    $bindvars = [
        [":RestaurantAddress", $restaurantaddress]
    ];

    $result = $database->executeFetchAll($query, $bindvars);
    
    echo json_encode($result, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    $database->disconnect();
?>