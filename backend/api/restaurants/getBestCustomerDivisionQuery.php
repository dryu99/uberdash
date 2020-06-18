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
    $query = "SELECT *
    FROM Customers c
    WHERE NOT EXISTS (
      (SELECT m.MenuItem_Name 
       FROM MenuItemsMadeAt m 
       WHERE m.Restaurant_Address = '2033 E Hastings St')
      MINUS
      (SELECT m2.MenuItem_Name
       FROM OrderInformation oi
       INNER JOIN OrderContainsMenuItem ocmi
        ON oi.OrderInformation_ID = ocmi.OrderInformation_ID
       INNER JOIN MenuItemsMadeAt m2
        ON (ocmi.MenuItem_Name = m2.MenuItem_Name
            AND ocmi.Restaurant_Address = m2.Restaurant_Address)
       WHERE oi.Customer_PhoneNumber = c.Customer_PhoneNumber
         AND oi.Restaurant_Address = :RestaurantAddress)
    )";
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