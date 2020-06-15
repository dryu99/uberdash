<?php 
  include_once './login.php';
  
  $query = "SELECT *
    FROM Customers c
    INNER JOIN PaymentInfo pi
      ON c.CreditCardNumber = pi.CreditCardNumber   
    WHERE c.Customer_PhoneNumber = :PhoneNumber
      AND c.Customer_Password = :Password";

  login($query);
?>