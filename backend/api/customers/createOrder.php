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

    $orderid = rand(3, 1000000); // orderid needs to be unique and not null (PK) - generate this in a better way
    $orderdate = date("m-d-Y"); // date now
    $orderstatusid = 0; // default 0 - processing

    $customerphonenumber = isset($_GET['PhoneNumber']) 
    ? $_GET['PhoneNumber']
    : die(http_response_code(404));
    $address = isset($_GET['OrderAddress']) 
    ? $_GET['OrderAddress']
    : die(http_response_code(404)); // from user input
    $address = urldecode($address);
    $restaurantaddress = isset($_GET['RestaurantAddress']) 
    ? $_GET['RestaurantAddress']
    : die(http_response_code(404));
    $restaurantaddress = urldecode($restaurantaddress);

    $delivererphonenumber = '778-555-6666'; // randomly choose a deliverer

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

    // double check the return from db->execute so that error handling can be done
    $result = $database->execute($query, $bindvars);

    $orderInfo = json_decode(file_get_contents('php://input'));

    $query = "INSERT INTO OrderContainsMenuItem
    VALUES (:OrderID, :ItemName, :RestaurantAddress, :Quantity)";

    // optimize if there is time
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