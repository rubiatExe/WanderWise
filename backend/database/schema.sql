-- Enable TimescaleDB extension (if available)
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Metadata Tables
CREATE TABLE airlines (
    iata_code VARCHAR(3) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE airports (
    iata_code VARCHAR(3) PRIMARY KEY,
    city VARCHAR(255),
    country VARCHAR(255),
    timezone VARCHAR(50)
);

CREATE TABLE routes (
    route_id VARCHAR(50) PRIMARY KEY, -- e.g., JFK-LHR
    origin_code VARCHAR(3) REFERENCES airports(iata_code),
    dest_code VARCHAR(3) REFERENCES airports(iata_code)
);

-- Currency & Rewards Nodes
CREATE TABLE currencies (
    currency_id VARCHAR(50) PRIMARY KEY, -- e.g., 'Chase UR', 'United MileagePlus'
    type VARCHAR(20) CHECK (type IN ('bank', 'airline', 'hotel'))
);

-- Transfer Edges (Graph Relationships stored as Relational Data)
CREATE TABLE transfer_partners (
    source_currency VARCHAR(50) REFERENCES currencies(currency_id),
    target_currency VARCHAR(50) REFERENCES currencies(currency_id),
    transfer_ratio DECIMAL(5, 2) NOT NULL, -- e.g., 1.0 for 1:1
    transfer_time_hours INT DEFAULT 0,
    PRIMARY KEY (source_currency, target_currency)
);

-- Flight Data (Hypertable)
CREATE TABLE flight_prices (
    time TIMESTAMPTZ NOT NULL,
    route_id VARCHAR(50) REFERENCES routes(route_id),
    source VARCHAR(50),
    data_type VARCHAR(10) CHECK (data_type IN ('cash', 'award')),
    price_usd DECIMAL(10, 2),
    points_required INT,
    program VARCHAR(50), -- For award data
    cabin_class VARCHAR(20),
    is_award BOOLEAN DEFAULT FALSE
);

-- Convert to Hypertable
SELECT create_hypertable('flight_prices', 'time');

-- Indexes for Query Performance
CREATE INDEX idx_flight_prices_route_time ON flight_prices (route_id, time DESC);
CREATE INDEX idx_flight_prices_program ON flight_prices (program, time DESC) WHERE is_award = TRUE;
