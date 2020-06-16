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

    // get columns to select
    $columns_to_select = isset($_GET['Columns']) 
    ? $_GET['Columns'] 
    : '';

    // SELECT OI.OrderDate, OI.ID, MAX(MI.AveragePrepTime) FROM OrderInformation OI 
    // INNER JOIN OrderContainsMenuItem OM ON OI.ID = OM.OrderID 
    // INNER JOIN MenuItemsMadeAt MI ON MI.RestaurantAddress = OI.RestaurantAddress 
    // INNER JOIN OrderStatus OS ON OI.OrderStatusID = OS.ID 
    // INNER JOIN Customers C ON OI.CustomerPhoneNumber = C.PhoneNumber 
    // INNER JOIN Deliverer D ON OI.DelivererPhoneNumber = D.PhoneNumber 
    // WHERE OM.RestaurantAddress = '2033 E Hastings St' AND OS.ID = '1' 
    // GROUP BY OI.OrderDate, OI.ID 
    // ORDER BY OI.OrderDate DESC;

    // Create and execute query 
    $query = "SELECT OI.OrderDate, OI.ID, MAX(MI.AveragePrepTime) " . $columns_to_select . " FROM OrderInformation OI 
            INNER JOIN OrderContainsMenuItem OM ON OI.ID = OM.OrderID
            INNER JOIN MenuItemsMadeAt MI ON MI.RestaurantAddress = OI.RestaurantAddress
            INNER JOIN OrderStatus OS ON OI.OrderStatusID = OS.ID
            INNER JOIN Customers C ON OI.CustomerPhoneNumber = C.PhoneNumber
            INNER JOIN Deliverer D ON OI.DelivererPhoneNumber = D.PhoneNumber
            WHERE OM.RestaurantAddress = :RestaurantAddress AND OS.ID = '1'
            GROUP BY OI.OrderDate, OI.ID " . $columns_to_select . "
            ORDER BY OI.OrderDate DESC";
    $bindvars = [[":RestaurantAddress", $restaurant_address]];

    $result = $database->executeFetchAll($query, $bindvars);

    // init response variable containing query result
    $response = count($result) > 0 
    ? $result[0] // query succeeded, specified orders found
    : die(http_response_code(404)); // query failed, No orders were found

    // return response in JSON format
    echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    // disconnect from DB
    $database->disconnect();


?>
