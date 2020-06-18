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

  // get params from request
  $deliv_phone_number = isset($_GET['DelivererPhoneNumber']) 
    ? $_GET['DelivererPhoneNumber'] 
    : die(http_response_code(404));  

  // check to see if deliverer exists
  $query = "SELECT *
    FROM Deliverer d
    WHERE d.Deliverer_PhoneNumber = :Deliverer_PhoneNumber";
  $bindvars = [[":Deliverer_PhoneNumber", $deliv_phone_number]];
  $result = $database->executeFetchAll($query, $bindvars);   

  if(!$result || count($result) <= 0) {
    // deliverer doesn't exist go die
    die(http_response_code(404));
  }

  // create and execute update query
  $query = "UPDATE Deliverer d
    SET d.Deliverer_Name = :New_Deliverer_Name,
        d.Deliverer_PhoneNumber = :New_Deliverer_PhoneNumber,
        d.Deliverer_Password = :New_Deliverer_Password,
        d.Deliverer_EmailAddress = :New_Deliverer_EmailAddress,
        d.WorkStatus = :New_WorkStatus
    WHERE d.Deliverer_PhoneNumber = :Deliverer_PhoneNumber";
  $bindvars = [
    [":New_Deliverer_Name", $data->name],
    [":New_Deliverer_PhoneNumber", $data->phoneNumber],
    [":New_Deliverer_Password", $data->password],
    [":New_Deliverer_EmailAddress", $data->email],
    [":New_WorkStatus", $data->workStatus],
    [":Deliverer_PhoneNumber", $deliv_phone_number]
  ];

  try {
    $database->execute($query, $bindvars);
    echo json_encode(['message' => "Deliverer was successfully updated"], 
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