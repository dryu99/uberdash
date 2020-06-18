SELECT * FROM (OrderContainsMenuItems om1 INNER JOIN OrderInformation oi1 ON om1.OrderID = oi1.ID) WHERE NOT EXISTS ((SELECT m.MenuItemName FROM MenuItemsMadeAt m) EXCEPT (SELECT om2.MenuItemName FROM OrderContainsMenuItems om2 INNER JOIN OrderInformation oi2 ON om2.OrderID = oi2.ID WHERE oi2.CustomerPhoneNumber = oi1.CustomerPhoneNumber));

SELECT * FROM OrderContainsMenuItems om1 INNER JOIN OrderInformation oi1 ON om1.OrderID = oi1.ID
WHERE CustomerPhoneNumber not in (SELECT CustomerPhoneNumber FROM (
(SELECT CustomerPhoneNumber, MenuItemName FROM (SELECT MenuItemName FROM MenuItemsMadeAt) p CROSS JOIN (SELECT DISTINCT CustomerPhoneNumber FROM OrderInformation) sp) 
EXCEPT
(SELECT CustomerPhoneNumber, MenuItemName FROM OrderContainsMenuItems om1 INNER JOIN OrderInformation oi1 ON om1.OrderID = oi1.ID)) r);

SELECT CustomerPhoneNumber, P.Name FROM Customers C INNER JOIN PaymentInfo P ON C.CreditCardNumber = P.CreditCardNumber INNER JOIN OrderInformation OI ON C.PhoneNumber = OI.CustomerPhoneNumber 
INNER JOIN OrderContainsMenuItem OM ON OI.ID = OrderID LEFT JOIN MenuItemsMadeAt MM ON MM.MenuItemName = OM.MenuItemName AND MM.RestaurantAddress = OM.RestaurantAddress GROUP BY CustomerPhoneNumber, P.Name HAVING COUNT(*) = (SELECT COUNT(*) FROM MenuItemsMadeAt);