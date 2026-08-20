ALTER TABLE tgsOrders DROP CONSTRAINT IF EXISTS tgsorders_status_check;
ALTER TABLE tgsOrders ADD CONSTRAINT tgsorders_status_check
  CHECK (status IN ('pending', 'paid', 'delivered', 'cancelled', 'failed'));
