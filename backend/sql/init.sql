-- CASCADE CONSTRAINTS is oracle syntax that lets us drop tables w/o foreign key error msgs
DROP TABLE PaymentInfo CASCADE CONSTRAINTS;
DROP TABLE Customers CASCADE CONSTRAINTS;

CREATE TABLE PaymentInfo(
  CreditCardNumber CHAR(16),
  Name VARCHAR(20),
  Address VARCHAR(30),
  PRIMARY KEY (CreditCardNumber)
);
GRANT SELECT ON PaymentInfo TO public;

CREATE TABLE Customers( 
  PhoneNumber VARCHAR(20),
  EmailAddress VARCHAR(50) UNIQUE,
  Password VARCHAR(64),
  CreditCardNumber CHAR(16) NOT NULL, 
  PRIMARY KEY (PhoneNumber),
  FOREIGN KEY (CreditCardNumber) REFERENCES PaymentInfo
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT SELECT ON Customers TO public;

INSERT INTO PaymentInfo 
VALUES ('12345678', 'Mingxin Gong', '5501 West Mall, V5X 3L4');

INSERT INTO PaymentInfo 
VALUES ('87654321', 'Chris Tse', '1234 10th Avenue, V6Y 5I9');

INSERT INTO PaymentInfo 
VALUES ('910111213', 'Daniel Ryu', '1430 Wesbrook Mall, V6X 5I1');