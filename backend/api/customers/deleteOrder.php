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

    $phonenumber = isset($_GET['PhoneNumber']) 
    ? $_GET['PhoneNumber']
    : die(http_response_code(404));

    $orderid = isset($_GET['OrderID']) 
    ? $_GET['OrderID']
    : die(http_response_code(404));

    $query = "DELETE FROM OrderInformation
    WHERE Customer_PhoneNumber = :PhoneNumber AND OrderInformation_ID = :OrderID";

    $bindvars = [
        [":PhoneNumber", $phonenumber],
        [":OrderID", $orderid]
    ];

    $result = $database->execute($query, $bindvars);

    echo $result;

    $database->disconnect();
?>