<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header('Access-Control-Allow-Headers: Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With, Accept, Access-Control-Request-Method');
    
    // get database connection
    include_once '../../config/Database.php';

    // get MenuItem Information
    include_once '../../model/MenuItem.php';
  

    // needed to prevent CORS errors from occuring when requests are made from browser
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        return 0;
      }

    // Initialize DB
    $db = new Database();
    $db->connect();

    $menuitem = new MenuItem($db);
    
    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    $menuitem->item_name = $data->item_name;
    $menuitem->restaurant_address = $data->restaurant_address;
    $menuitem->menuitem_cost = $data->menuitem_cost;
    $menuitem->menuitem_description = $data->menuitem_description;
    $menuitem->menuitem_averagepreptime = $data->menuitem_averagepreptime;
    
    if ($menuitem->create()) {
        http_response_code(201);
        echo json_encode(array("message" => "Menu Item was added."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to add item."));
    }

    $db->disconnect();
?>