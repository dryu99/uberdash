<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM Customers c
    INNER JOIN PaymentInfo pi
      ON c.CreditCardNumber = pi.CreditCardNumber   
    WHERE c.PhoneNumber = :PhoneNumber
      AND c.Password = :Password";

  login($query);
?>