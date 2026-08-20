CREATE TABLE IF NOT EXISTS tgsOrders (
    id                  BIGSERIAL PRIMARY KEY,
    status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
    currency            TEXT NOT NULL DEFAULT 'INR',
    amount              NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    items               JSONB NOT NULL,
    first_name          TEXT NOT NULL,
    last_name           TEXT NOT NULL,
    company_name        TEXT,
    email               TEXT NOT NULL,
    phone               TEXT NOT NULL,
    country             TEXT NOT NULL,
    address1            TEXT NOT NULL,
    address2            TEXT,
    city                TEXT NOT NULL,
    state               TEXT NOT NULL,
    postcode            TEXT NOT NULL,
    notes               TEXT,
    razorpay_order_id   TEXT NOT NULL UNIQUE,
    razorpay_payment_id TEXT,
    razorpay_signature  TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON tgsOrders (status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON tgsOrders (email);
