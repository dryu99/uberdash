<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM RestaurantAdmins
    WHERE PhoneNumber = :PhoneNumber
      AND Password = :Password";

  login($query);
?>