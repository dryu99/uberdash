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
  $phone_number = isset($_GET['PhoneNumber']) 
    ? $_GET['PhoneNumber'] 
    : die();

  // create and execute query
  $query = "SELECT *
    FROM Customers C
    WHERE C.PhoneNumber = :PhoneNumber";
  $bindvars = [[":PhoneNumber", $phone_number]];
  $result = $database->executeFetchAll($query, $bindvars);   

  // init response variable containing query result
  $response = count($result) > 0 
    ? $result[0] // result is an array, we just want the single result found
    : die();

  // return response in JSON format
  echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

  // disconnect from DB
  $database->disconnect();
?>