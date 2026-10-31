CREATE TRIGGER fulfill_reserved_reward AFTER UPDATE OF qualified ON orders WHEN NEW.qualified=1 AND OLD.qualified=0 BEGIN
 UPDATE rewards SET status='redeemed',redeemed_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE order_id=NEW.id AND status='reserved';
END;
