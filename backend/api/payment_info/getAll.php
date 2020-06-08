<?php 
  // Imports
  include_once '../../config/Database.php';
  
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  // init DB & connect
  $database = new Database();
  $database->connect();

  // execute query
  $result = $database->executeFetchAll("SELECT * FROM PaymentInfo");   

  // create response array containing query result
  $response = ['data' => $result];

  // return response in JSON format
  echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

  // disconnect from DB
  $database->disconnect();
?>