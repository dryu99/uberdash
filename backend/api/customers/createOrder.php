<?php
    // Imports
    include_once '../../config/Database.php';
    
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With, Accept, Access-Control-Request-Method');

    // needed to prevent CORS errors from occuring when requests are made from browser
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      return 0;
    }

    // init DB & connect
    $database = new Database();
    $database->connect();

    $orderid = rand(3, 1000000);
    $orderdate = date("m-d-Y");
    $orderstatusid = 0;

    $customerphonenumber = isset($_GET['PhoneNumber']) 
    ? $_GET['PhoneNumber']
    : die(http_response_code(404));

    $address = isset($_GET['OrderAddress']) 
    ? $_GET['OrderAddress']
    : die(http_response_code(404));
    $address = urldecode($address);

    $restaurantaddress = isset($_GET['RestaurantAddress']) 
    ? $_GET['RestaurantAddress']
    : die(http_response_code(404));
    $restaurantaddress = urldecode($restaurantaddress);

    // selects deliverer (who have work status 1) with the least amount of orders assigned (which are not complete)
    // in the case of multiple candidates, just selects the first deliverer in the list
    $queryDeliverer = "SELECT Deliverer.Deliverer_PhoneNumber, COUNT(*)
    FROM Deliverer
    INNER JOIN OrderInformation 
    ON Deliverer.Deliverer_PhoneNumber = OrderInformation.Deliverer_PhoneNumber
    WHERE WorkStatus = 1 AND OrderStatus_ID != 3
    GROUP BY Deliverer.Deliverer_PhoneNumber
    ORDER BY COUNT(*)";
    $deliverers = $database->executeFetchAll($queryDeliverer);
    $deliverer = reset($deliverers);
    $delivererphonenumber = $deliverer['DELIVERER_PHONENUMBER'];

    $query = "INSERT INTO OrderInformation
    VALUES (:OrderID, TO_DATE(:OrderDate, 'mm-dd-yyyy'), :Address, :OrderStatusID, :RestaurantAddress, :CustomerPhoneNumber, :DelivererPhoneNumber)";

    $bindvars = [
        [":OrderID", $orderid],
        [":OrderDate", $orderdate],
        [":Address", $address],
        [":OrderStatusID", $orderstatusid],
        [":RestaurantAddress", $restaurantaddress],
        [":CustomerPhoneNumber", $customerphonenumber],
        [":DelivererPhoneNumber", $delivererphonenumber]
    ];

    $result = $database->execute($query, $bindvars);

    $orderInfo = json_decode(file_get_contents('php://input'));

    $query = "INSERT INTO OrderContainsMenuItem
    VALUES (:OrderID, :ItemName, :RestaurantAddress, :Quantity)";

    for ($i=0; $i<count($orderInfo); $i++) {
        $bindvars = [
            [":OrderID", $orderid],
            [":ItemName", $orderInfo[$i]->itemName],
            [":RestaurantAddress", $restaurantaddress],
            [":Quantity", $orderInfo[$i]->quantity]
        ];
        
        $result = $result && $database->execute($query, $bindvars);
    }

    echo $result;

    $database->disconnect();
?>