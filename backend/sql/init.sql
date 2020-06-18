-- CASCADE CONSTRAINTS is oracle syntax that lets us drop tables w/o foreign key error msgs
-- Drop tables to avoid issues on repeated sql initialization
DROP TABLE PaymentInfo CASCADE CONSTRAINTS;
DROP TABLE Customers CASCADE CONSTRAINTS;
DROP TABLE Restaurant CASCADE CONSTRAINTS;
DROP TABLE RestaurantAdmin CASCADE CONSTRAINTS;
DROP TABLE Vehicle CASCADE CONSTRAINTS;
DROP TABLE Deliverer CASCADE CONSTRAINTS;
DROP TABLE OrderStatus CASCADE CONSTRAINTS;
DROP TABLE RestaurantLocation CASCADE CONSTRAINTS;
DROP TABLE OrderInformation CASCADE CONSTRAINTS;
DROP TABLE MenuItemsMadeAt CASCADE CONSTRAINTS;
DROP TABLE OrderContainsMenuItem CASCADE CONSTRAINTS;
DROP TABLE FoodType CASCADE CONSTRAINTS;
DROP TABLE MenuItemIsOfType CASCADE CONSTRAINTS;
DROP TABLE RestaurantIsOfType CASCADE CONSTRAINTS;


-- Initilization of tables and granting all privileges (select, delete, update, etc..) to all users (public)
CREATE TABLE PaymentInfo(
  CreditCardNumber CHAR(16),
  CreditCardHolder_Name VARCHAR(20),
  CreditCardHolder_Address VARCHAR(30),
  PRIMARY KEY (CreditCardNumber)
);
GRANT SELECT ON PaymentInfo TO public;

CREATE TABLE Customers(
  Customer_PhoneNumber VARCHAR(20),  
  Customer_Name VARCHAR(20),
  Customer_EmailAddress VARCHAR(50) UNIQUE,
  Customer_Password VARCHAR(64),
  CreditCardNumber CHAR(16) NOT NULL, 
  PRIMARY KEY (Customer_PhoneNumber),
  FOREIGN KEY (CreditCardNumber) REFERENCES PaymentInfo
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT SELECT ON Customers TO public;

CREATE TABLE Restaurant(
  Restaurant_Name VARCHAR(30),
  Restaurant_Description VARCHAR(40),
  PRIMARY KEY (Restaurant_Name)
);
GRANT ALL PRIVILEGES ON Restaurant TO public

CREATE TABLE RestaurantLocation(
  Restaurant_Address VARCHAR(30),
  OpenStatus SMALLINT,
  Restaurant_Name VARCHAR(30),
  PRIMARY KEY (Restaurant_Address),
  FOREIGN KEY (Restaurant_Name) REFERENCES Restaurant
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON RestaurantLocation TO public

CREATE TABLE RestaurantAdmin(
  RestaurantAdmin_PhoneNumber VARCHAR(20),
  RestaurantAdmin_EmailAddress VARCHAR(50) UNIQUE,
  RestaurantAdmin_Password VARCHAR(64),
  Restaurant_Address VARCHAR(30) NOT NULL,
  PRIMARY KEY (RestaurantAdmin_PhoneNumber),
  FOREIGN KEY (Restaurant_Address) REFERENCES RestaurantLocation
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON RestaurantAdmin TO public

CREATE TABLE Vehicle(
  Vehicle_LicensePlateNumber CHAR(6),
  Vehicle_Model VARCHAR(20),
  PRIMARY KEY (Vehicle_LicensePlateNumber)
);
GRANT ALL PRIVILEGES ON Vehicle TO public

CREATE TABLE Deliverer(
  Deliverer_Name VARCHAR(20),
  Deliverer_PhoneNumber VARCHAR(20),
  Deliverer_Password VARCHAR(64),
  Deliverer_EmailAddress VARCHAR(50) UNIQUE,
  WorkStatus SMALLINT,
  Vehicle_LicensePlateNumber CHAR(6),
  PRIMARY KEY (Deliverer_PhoneNumber),
  FOREIGN KEY (Vehicle_LicensePlateNumber) REFERENCES Vehicle
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON Deliverer TO public

CREATE TABLE OrderStatus(
  OrderStatus_ID INT,
  OrderStatus_Name VARCHAR(30),
  PRIMARY KEY (OrderStatus_ID)
);
GRANT ALL PRIVILEGES ON OrderStatus TO public

CREATE TABLE OrderInformation(
  OrderInformation_ID INT,
  OrderInformation_OrderDate DATE,
  OrderInformation_OrderAddress VARCHAR(30),
  OrderStatus_ID INT NOT NULL,
  Restaurant_Address VARCHAR(30) NOT NULL,
  Customer_PhoneNumber VARCHAR(20) NOT NULL,
  Deliverer_PhoneNumber VARCHAR(20) NOT NULL,
  PRIMARY KEY (OrderInformation_ID),
  FOREIGN KEY (OrderStatus_ID) REFERENCES OrderStatus,
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
  FOREIGN KEY (Restaurant_Address) REFERENCES RestaurantLocation,
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
  FOREIGN KEY (Customer_PhoneNumber) REFERENCES Customers,
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
  FOREIGN KEY (Deliverer_PhoneNumber) REFERENCES Deliverer
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON OrderInformation TO public

CREATE TABLE MenuItemsMadeAt(
  MenuItem_Name VARCHAR(30),
  Restaurant_Address VARCHAR(30),
  MenuItem_Cost FLOAT,
  MenuItem_Description VARCHAR(40),
  MenuItem_AveragePrepTime FLOAT,
  PRIMARY KEY (MenuItem_Name, Restaurant_Address),
  FOREIGN KEY (Restaurant_Address) REFERENCES RestaurantLocation
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON MenuItemsMadeAt TO public

CREATE TABLE OrderContainsMenuItem(
  OrderInformation_ID INT,
  MenuItem_Name VARCHAR(30),
  Restaurant_Address VARCHAR(30),
  MenuItem_Order_Quantity INT,
  PRIMARY KEY (OrderInformation_ID, MenuItem_Name, Restaurant_Address),
  FOREIGN KEY (OrderInformation_ID) REFERENCES OrderInformation
    ON DELETE CASCADE,
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
  FOREIGN KEY (MenuItem_Name, Restaurant_Address) REFERENCES MenuItemsMadeAt
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON OrderContainsMenuItem TO public

CREATE TABLE FoodType(
  FoodType_ID INT,
  FoodType_Name VARCHAR(30),
  PRIMARY KEY (FoodType_ID)
);
GRANT ALL PRIVILEGES ON FoodType TO public

CREATE TABLE MenuItemIsOfType(
  MenuItem_Name VARCHAR(30),
  Restaurant_Address VARCHAR(30),
  FoodType_ID INT,
  PRIMARY KEY (MenuItem_Name, Restaurant_Address, FoodType_ID),
  FOREIGN KEY (MenuItem_Name, Restaurant_Address) REFERENCES MenuItemsMadeAt,
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
  FOREIGN KEY (FoodType_ID) REFERENCES FoodType
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON MenuItemIsOfType TO public

CREATE TABLE RestaurantIsOfType(
  Restaurant_Name VARCHAR(30),
  FoodType_ID INT,
  PRIMARY KEY (Restaurant_Name, FoodType_ID),
  FOREIGN KEY (Restaurant_Name) REFERENCES Restaurant,
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
  FOREIGN KEY (FoodType_ID) REFERENCES FoodType
    -- ON UPDATE CASCADE (Oracle doesn't support UPDATE)
);
GRANT ALL PRIVILEGES ON RestaurantIsOfType TO public

-- Initialization of table instances / tuples
INSERT INTO PaymentInfo 
VALUES ('12345678', 'Mingxin Gong', '5501 West Mall, V5X 3L4');
INSERT INTO PaymentInfo 
VALUES ('87654321', 'Chris Tse', '1234 10th Avenue, V6Y 5I9');
INSERT INTO PaymentInfo 
VALUES ('910111213', 'Daniel Ryu', '1430 Wesbrook Mall, V6X 5I1');

INSERT INTO Customers
VALUES ('1', 'Daniel Brother', 'rujjiryu99@gmail.com', 'password', '12345678');
INSERT INTO Customers 
VALUES ('2', 'Chris Tse', 'ChristopherTse98@gmail.com', 'password', '87654321');
INSERT INTO Customers 
VALUES ('3', 'Mingxin Gong', 'mingxin.gong2@gmail.com', 'password', '12345678');

INSERT INTO Restaurant
VALUES ('Five Guys', 'Home of the Burger Family');
INSERT INTO Restaurant
VALUES ('McDonalds', 'Lovin It');
INSERT INTO Restaurant
VALUES ('Burger King', 'Have It Your Way');

INSERT INTO RestaurantLocation
VALUES ('2909 Grandview Hwy', 1, 'Five Guys');
INSERT INTO RestaurantLocation
VALUES ('2033 E Hastings St', 0, 'McDonalds');
INSERT INTO RestaurantLocation
VALUES ('4700 Kingsway Unit 1200e', 1, 'Burger King');

INSERT INTO RestaurantAdmin
VALUES ('604-111-1111', 'Jake@gmail.com', 'iamjake123', '2909 Grandview Hwy');
INSERT INTO RestaurantAdmin
VALUES ('604-222-2222', 'Mike@gmail.com', 'iammike123', '2033 E Hastings St');
INSERT INTO RestaurantAdmin
VALUES ('604-333-3333', 'Cindy@gmail.com', 'iamjake123', '4700 Kingsway Unit 1200e');

INSERT INTO Vehicle
VALUES ('CFS42E', 'Honda Civic');
INSERT INTO Vehicle
VALUES ('CD7172', 'Honda Accord');
INSERT INTO Vehicle
VALUES ('241EKA', 'Mazda 3');

INSERT INTO Deliverer
VALUES ('Daniel Uyr', '778-555-6666', 'iamdaniel123', 'daniel.uyr@gmail.com', 1, 'CFS42E');
INSERT INTO Deliverer
VALUES ('Ming Gnog', '778-666-7777', 'iamming123', 'ming.gnog@gmail.com', 1, 'CD7172');
INSERT INTO Deliverer
VALUES ('Christopher Est', '778-777-8888', 'iamchristopher123', 'christopher.est@gmail.com', 1, '241EKA');

INSERT INTO OrderStatus
VALUES (0, 'Order Received by Restaurant');
INSERT INTO OrderStatus
VALUES (1, 'Order Ready for Pickup');
INSERT INTO OrderStatus
VALUES (2, 'Order is Being Delivered');
INSERT INTO OrderStatus
VALUES (3, 'Completed');

INSERT INTO OrderInformation
VALUES (0, TO_DATE('06-1-2020','mm-dd-yyyy'), '1430 Wesbrook Mall', 0, '2909 Grandview Hwy', '1', '778-555-6666');
INSERT INTO OrderInformation
VALUES (1, TO_DATE('06-2-2020','mm-dd-yyyy'), '1234 10th Avenue, V6Y 5I9', 1, '2033 E Hastings St', '2', '778-666-7777');
INSERT INTO OrderInformation
VALUES (2, TO_DATE('06-3-2020','mm-dd-yyyy'), '1430 Wesbrook Mall', 2, '4700 Kingsway Unit 1200e', '3', '778-777-8888');
INSERT INTO OrderInformation
VALUES (3, TO_DATE('06-4-2020','mm-dd-yyyy'), '1430 Wesbrook Mall', 1, '2033 E Hastings St', '3', '778-666-7777');
INSERT INTO OrderInformation
VALUES (4, TO_DATE('06-5-2020','mm-dd-yyyy'), '1430 Wesbrook Mall', 1, '2033 E Hastings St', '3', '778-666-7777');
INSERT INTO OrderInformation
VALUES (5, TO_DATE('06-6-2020','mm-dd-yyyy'), '1430 Wesbrook Mall', 2, '2033 E Hastings St', '3', '778-666-7777');

INSERT INTO MenuItemsMadeAt
VALUES ('Patty Melt', '2909 Grandview Hwy', 5.25, 'Eat Me Now', 3);
INSERT INTO MenuItemsMadeAt
VALUES ('Hot Cakes', '2909 Grandview Hwy', 4.50, 'Eat Me Fast', 2);
INSERT INTO MenuItemsMadeAt
VALUES ('McChicken', '2033 E Hastings St', 5.50, 'Delicious', 3.50);
INSERT INTO MenuItemsMadeAt
VALUES ('Filet-o-Fish', '2033 E Hastings St', 3.50, 'Awesome', 5.50);
INSERT INTO MenuItemsMadeAt
VALUES ('Big Mac', '2033 E Hastings St', 6.50, 'The classic', 1.50);
INSERT INTO MenuItemsMadeAt
VALUES ('Whopper', '4700 Kingsway Unit 1200e', 3.75, 'Grilled', 2);

INSERT INTO OrderContainsMenuItem
VALUES (0, 'Patty Melt', '2909 Grandview Hwy', 2);
INSERT INTO OrderContainsMenuItem
VALUES (1, 'McChicken', '2033 E Hastings St', 5);
INSERT INTO OrderContainsMenuItem
VALUES (1, 'Filet-o-Fish', '2033 E Hastings St', 2);
INSERT INTO OrderContainsMenuItem
VALUES (1, 'Big Mac', '2033 E Hastings St', 1);
INSERT INTO OrderContainsMenuItem
VALUES (3, 'Whopper', '4700 Kingsway Unit 1200e', 3);
INSERT INTO OrderContainsMenuItem
VALUES (3, 'Big Mac', '2033 E Hastings St', 3);
INSERT INTO OrderContainsMenuItem
VALUES (4, 'McChicken', '2033 E Hastings St', 1);
INSERT INTO OrderContainsMenuItem
VALUES (5, 'Filet-o-Fish', '2033 E Hastings St', 3);
INSERT INTO OrderContainsMenuItem
VALUES (2, 'Whopper', '4700 Kingsway Unit 1200e', 3);

INSERT INTO FoodType
VALUES (1, 'Poultry');
INSERT INTO FoodType
VALUES (2, 'Meat');
INSERT INTO FoodType
VALUES (3, 'Fruit');

INSERT INTO MenuItemIsOfType
VALUES ('Patty Melt', '2909 Grandview Hwy', 2);
INSERT INTO MenuItemIsOfType
VALUES ('McChicken', '2033 E Hastings St', 1);
INSERT INTO MenuItemIsOfType
VALUES ('Whopper', '4700 Kingsway Unit 1200e', 2);

INSERT INTO RestaurantIsOfType
VALUES ('Five Guys', 1);
INSERT INTO RestaurantIsOfType
VALUES ('McDonalds', 1);
INSERT INTO RestaurantIsOfType
VALUES ('Burger King', 1);