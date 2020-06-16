<?php 
  function login($query) {
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

    // get raw posted data
    $data = json_decode(file_get_contents('php://input'));

    // execute given query (look for specified user in db)
    $bindvars = [
      [":PhoneNumber", $data->username],
      [":Password", $data->password]
    ];
    $result = $database->executeFetchAll($query, $bindvars);   

    // init response variable containing query result
    $response = $result && count($result) > 0 
      ? $result[0] // query succeeded, specified user was found
      : die(http_response_code(404)); // query failed, specified user couldn't be found

    // return response in JSON format
    echo json_encode($response, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

    // disconnect from DB
    $database->disconnect();
  }
?>