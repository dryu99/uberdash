<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM RestaurantAdmin
    WHERE RestaurantAdmin_PhoneNumber = :PhoneNumber
      AND RestaurantAdmin_Password = :Password";

  login($query);
?>