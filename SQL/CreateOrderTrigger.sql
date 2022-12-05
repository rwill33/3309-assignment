DROP Trigger IF EXISTS InsertOrderItem ;

delimiter //
	CREATE TRIGGER InsertOrderItem
	AFTER INSERT ON icommercestore.Order
	FOR EACH ROW
	BEGIN
		INSERT INTO OrderItem (orderNo, productId, quantity)
        SELECT NEW.orderNo, productId, c.quantity
        FROM CartItem c 
        JOIN Product p 
        USING(productId) 
        WHERE username=NEW.username AND storeId=NEW.storeId;
	END; //
delimiter ;