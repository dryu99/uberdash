<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM Deliverer
    INNER JOIN Vehicle
      ON Deliverer.Vehicle_LicensePlateNumber = Vehicle.Vehicle_LicensePlateNumber
    WHERE Deliverer_PhoneNumber = :PhoneNumber
      AND Deliverer_Password = :Password";

  login($query);
?>