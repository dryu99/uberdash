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
    FROM Deliverer d
    INNER JOIN Vehicle v
      ON d.Vehicle_LicensePlateNumber = v.Vehicle_LicensePlateNumber    
    WHERE d.Deliverer_PhoneNumber = :Deliverer_PhoneNumber";
  $bindvars = [[":Deliverer_PhoneNumber", $deliv_phone_number]];
  $result = $database->executeFetchAll($query, $bindvars);   

  // init response variable containing query result
  $response = count($result) > 0 
    ? $result[0] // query succeeded, specified customer was found
    : die(http_response_code(404)); // query failed, specified customer couldn't be found

  // return response in JSON format
  echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_NUMERIC_CHECK);

  // disconnect from DB
  $database->disconnect();
?>