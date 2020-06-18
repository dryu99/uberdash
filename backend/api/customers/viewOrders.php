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

    $query = "";
    $bindvars = [];
    $customerphonenumber = isset($_GET['PhoneNumber']) 
    ? $_GET['PhoneNumber']
    : die(http_response_code(404));
    $orderidfilter = $_GET['OrderID'];

    if (isset($orderidfilter)) {
        //filter by orderid for orders from the given user
        $query = "SELECT OrderInformation_ID, OrderInformation_OrderDate, OrderInformation_OrderAddress, OrderStatus_Name, Deliverer_PhoneNumber, OrderInformation.Restaurant_Address, Restaurant_Name
        FROM OrderInformation, RestaurantLocation, OrderStatus
        WHERE Customer_PhoneNumber = :PhoneNumber
            AND OrderInformation_ID = :OrderID
            AND OrderInformation.Restaurant_Address = RestaurantLocation.Restaurant_Address
            AND OrderInformation.OrderStatus_ID = OrderStatus.OrderStatus_ID";

        $bindvars = [
            [":PhoneNumber", $customerphonenumber],
            [":OrderID", $orderidfilter]
        ];
    } else {
        //default query for all orders for the given user
        $query = "SELECT OrderInformation_ID, OrderInformation_OrderDate, OrderInformation_OrderAddress, OrderStatus_Name, Deliverer_PhoneNumber, OrderInformation.Restaurant_Address, Restaurant_Name
        FROM OrderInformation, RestaurantLocation, OrderStatus
        WHERE Customer_PhoneNumber = :PhoneNumber
            AND OrderInformation.Restaurant_Address = RestaurantLocation.Restaurant_Address
            AND OrderInformation.OrderStatus_ID = OrderStatus.OrderStatus_ID";

        $bindvars = [
            [":PhoneNumber", $customerphonenumber]
        ];
    }

    $result = $database->executeFetchAll($query, $bindvars);

    echo json_encode($result, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    $database->disconnect();
?>