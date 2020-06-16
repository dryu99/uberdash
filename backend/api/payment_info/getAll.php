<?php 
  // Imports
  include_once '../../config/Database.php';
  
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  // init DB & connect
  $database = new Database();
  $database->connect();

  // create and execute query
  $query = "SELECT * FROM PaymentInfo";
  $result = $database->executeFetchAll($query);   

  // init response variable containing query result
  $response = $result;

  // return response in JSON format
  echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

  // disconnect from DB
  $database->disconnect();
?>