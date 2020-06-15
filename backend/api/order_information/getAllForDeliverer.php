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

  // create and execute query
  $query = "SELECT *
    FROM OrderInformation oi
    INNER JOIN RestaurantLocation rl
      ON oi.RestaurantAddress = rl.Address
    INNER JOIN Restaurant r
      ON rl.Name = r.Name
    INNER JOIN Restaurant r
      ON rl.Name = r.Name
    INNER JOIN Customers c
      ON oi.CustomerPhoneNumber = c.PhoneNumber
      -- TODO add another join for customer name (but hold off for now, we might change schema)
    WHERE oi.DelivererPhoneNumber = :DelivererPhoneNumber";
  $bindvars = [[":DelivererPhoneNumber", $deliv_phone_number]];
  $result = $database->executeFetchAll($query, $bindvars);   

  // init response variable containing query result
  $response = $result;

  // return response in JSON format
  echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

  // disconnect from DB
  $database->disconnect();
?>