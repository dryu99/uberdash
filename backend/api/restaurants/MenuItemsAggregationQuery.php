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
    $query = "SELECT OI.OrderInformation_ID FROM OrderInformation OI 
            INNER JOIN OrderContainsMenuItem OM ON OI.ID = OM.OrderID
            INNER JOIN MenuItemsMadeAt MA ON MA.RestaurantAddress = OI.RestaurantAddress AND MA.MenuItemName = OM.MenuItemName
            INNER JOIN OrderStatus OS ON OI.OrderStatusID = OS.ID
            INNER JOIN Customers C ON OI.CustomerPhoneNumber = C.PhoneNumber
            INNER JOIN Deliverer D ON OI.DelivererPhoneNumber = D.PhoneNumber
            WHERE OM.RestaurantAddress = :RestaurantAddress AND OS.ID = '1'
            GROUP BY OI.ID, OrderDate, OrderStatusID
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

SELECT * FROM OrderInformation OI 
            INNER JOIN OrderContainsMenuItem OM ON OI.ID = OM.OrderID
            INNER JOIN OrderStatus OS ON OI.OrderStatusID = OS.ID
            INNER JOIN Customers C ON OI.CustomerPhoneNumber = C.PhoneNumber
            INNER JOIN Deliverer D ON OI.DelivererPhoneNumber = D.PhoneNumber
            WHERE OM.RestaurantAddress = '2033 E Hastings St' AND OS.ID = '1'
            ORDER BY OI.OrderDate DESC