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

    // SELECT OI.OrderDate, OI.ID, Address FROM OrderInformation OI 
    // INNER JOIN OrderContainsMenuItem OM ON OI.ID = OM.OrderID 
    // INNER JOIN MenuItemsMadeAt MI ON MI.RestaurantAddress = OI.RestaurantAddress 
    // INNER JOIN OrderStatus OS ON OI.OrderStatusID = OS.ID 
    // INNER JOIN Customers C ON OI.CustomerPhoneNumber = C.PhoneNumber 
    // INNER JOIN Deliverer D ON OI.DelivererPhoneNumber = D.PhoneNumber 
    // WHERE OM.RestaurantAddress = '2033 E Hastings St'
    // GROUP BY OI.OrderDate, OI.ID, Address
    // ORDER BY OI.OrderDate DESC;


    // Create and execute query 
    $query = "SELECT OI.OrderInformation_OrderDate, OI.OrderInformation_ID". $columns_to_select .", MAX(MI.MenuItem_AveragePrepTime) FROM OrderInformation OI 
            INNER JOIN OrderContainsMenuItem OM ON OI.OrderInformation_ID = OM.OrderInformation_ID
            LEFT JOIN MenuItemsMadeAt MI ON MI.Restaurant_Address = OI.Restaurant_Address AND MI.MenuItem_Name = OM.MenuItem_Name
            INNER JOIN OrderStatus OS ON OI.OrderStatus_ID = OS.OrderStatus_ID
            INNER JOIN Customers C ON OI.Customer_PhoneNumber = C.Customer_PhoneNumber
            INNER JOIN Deliverer D ON OI.Deliverer_PhoneNumber = D.Deliverer_PhoneNumber
            WHERE OM.Restaurant_Address = :RestaurantAddress
            GROUP BY OI.OrderInformation_OrderDate, OI.OrderInformation_ID " . $columns_to_select ."
            ORDER BY MAX(MI.MenuItem_AveragePrepTime) DESC";
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
