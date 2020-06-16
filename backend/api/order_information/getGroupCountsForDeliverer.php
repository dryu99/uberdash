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

  $group_type = isset($_GET['Group']) 
    ? $_GET['Group'] 
    : die(http_response_code(404)); 

  // conditionally create and execute query
  if ($group_type === 'ALL') {
    $query = "SELECT COUNT(*) AS COUNT
      FROM OrderInformation oi
      WHERE oi.Deliverer_PhoneNumber = :DelivererPhoneNumber";
  } else {
    // have to specify table alias for Restaurant attributes
    if ($group_type === 'RESTAURANT_NAME' || $group_type === 'RESTAURANT_ADDRESS') {
      $group_type = "r.$group_type";
    }

    $query = "SELECT $group_type as GROUPTYPE, COUNT(*) AS COUNT
      FROM OrderInformation oi
      INNER JOIN RestaurantLocation rl
        ON oi.Restaurant_Address = rl.Restaurant_Address
      INNER JOIN Restaurant r
        ON rl.Restaurant_Name = r.Restaurant_Name
      INNER JOIN Customers c
        ON oi.Customer_PhoneNumber = c.Customer_PhoneNumber
      INNER JOIN OrderStatus os
        ON oi.OrderStatus_ID = os.OrderStatus_ID
      WHERE oi.Deliverer_PhoneNumber = :DelivererPhoneNumber
      GROUP BY $group_type";
  }

  $bindvars = [[":DelivererPhoneNumber", $deliv_phone_number]];               
  $result = $database->executeFetchAll($query, $bindvars);   

  // init response variable containing query result
  $response = $result;

  // return response in JSON format
  echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);

  // disconnect from DB
  $database->disconnect();
?>