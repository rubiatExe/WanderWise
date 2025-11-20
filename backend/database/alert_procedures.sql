-- Function to check for price drops
CREATE OR REPLACE FUNCTION check_price_drop(
    check_route_id VARCHAR, 
    current_price DECIMAL
) 
RETURNS BOOLEAN AS $$
DECLARE
    avg_price DECIMAL;
BEGIN
    -- Calculate 4-hour moving average for this route
    SELECT AVG(price_usd) INTO avg_price
    FROM flight_prices
    WHERE route_id = check_route_id
      AND time > NOW() - INTERVAL '4 hours'
      AND data_type = 'cash';

    -- If no history, assume no drop
    IF avg_price IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Return TRUE if current price is < 85% of average
    RETURN current_price < (avg_price * 0.85);
END;
$$ LANGUAGE plpgsql;
