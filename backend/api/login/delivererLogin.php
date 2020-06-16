<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM Deliverer
    WHERE Deliverer_PhoneNumber = :PhoneNumber
      AND Deliverer_Password = :Password";

  login($query);
?>