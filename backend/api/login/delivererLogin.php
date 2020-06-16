<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM Deliverers
    WHERE PhoneNumber = :PhoneNumber
      AND Password = :Password";

  login($query);
?>