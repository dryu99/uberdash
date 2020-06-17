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
    
    $query = "SELECT Restaurant.Restaurant_Name, Restaurant.Restaurant_Description, RestaurantLocation.Restaurant_Address
    FROM Restaurant
    INNER JOIN RestaurantLocation
    ON Restaurant.Restaurant_Name = RestaurantLocation.Restaurant_Name";

    $result = $database->executeFetchAll($query);

    $response = $result;
    
    echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    $database->disconnect();
?>