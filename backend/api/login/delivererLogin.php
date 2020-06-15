<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM Deliverer
    WHERE PhoneNumber = :PhoneNumber
      AND Password = :Password";

  login($query);
?>