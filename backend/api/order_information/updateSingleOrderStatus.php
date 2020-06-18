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

  // get raw put data
  $data = json_decode(file_get_contents('php://input'));

  // create and execute query
  $query = "UPDATE OrderInformation oi
    SET oi.OrderStatus_ID = :New_OrderStatus_ID
    WHERE oi.OrderInformation_ID = :OrderInformation_ID";

  $bindvars = [
    [":OrderInformation_ID", $data->orderInfoID],
    [":New_OrderStatus_ID", $data->orderStatusID]
  ];

  try {
    $database->execute($query, $bindvars);   
    echo json_encode(['message' => "Order $data->orderInfoID was successfully updated"], 
      JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);
  } catch (Exception $e) {
    // if sth goes wrong return error response
    http_response_code(404);
    echo json_encode(['error' => $e.getMessage()], 
      JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
  }

  // disconnect from DB
  $database->disconnect();
?>