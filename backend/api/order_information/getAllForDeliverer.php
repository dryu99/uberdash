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
  $deliv_phone_number = isset($_GET['DelivererPhoneNumber']) 
    ? $_GET['DelivererPhoneNumber'] 
    : die(http_response_code(404));

  $select = isset($_GET['Column']) // optional param, if no col is specified select all columns
    ? $_GET['Column']
    : '*';

  // have to specify table alias for Restaurant attributes
  if ($select  === 'RESTAURANT_NAME' || $select  === 'RESTAURANT_ADDRESS') {
    $select  = "r.$select ";
  }

  // create and execute query
  $query = "SELECT DISTINCT $select 
    FROM OrderInformation oi
    INNER JOIN RestaurantLocation rl
      ON oi.Restaurant_Address = rl.Restaurant_Address
    INNER JOIN Restaurant r
      ON rl.Restaurant_Name = r.Restaurant_Name
    INNER JOIN Customers c
      ON oi.Customer_PhoneNumber = c.Customer_PhoneNumber
    INNER JOIN OrderStatus os
      ON oi.OrderStatus_ID = os.OrderStatus_ID
    WHERE oi.Deliverer_PhoneNumber = :DelivererPhoneNumber";
  $bindvars = [[":DelivererPhoneNumber", $deliv_phone_number]];
  $result = $database->executeFetchAll($query, $bindvars);   

  // init response variable containing query result
  $response = $result;

  // return response in JSON format
  echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);

  // disconnect from DB
  $database->disconnect();
?>