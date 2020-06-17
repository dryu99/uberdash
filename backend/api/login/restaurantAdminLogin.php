<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM RestaurantAdmin
    WHERE PhoneNumber = :PhoneNumber
      AND Password = :Password";

  login($query);
?>