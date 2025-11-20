-- Recursive Query to find the optimal transfer path
-- Input: source_bank (e.g., 'Chase UR'), target_program (e.g., 'Aeroplan'), points_needed

WITH RECURSIVE transfer_path (
    current_currency, 
    path, 
    total_ratio, 
    steps
) AS (
    -- Base Case: Start at the source bank
    SELECT 
        currency_id, 
        ARRAY[currency_id]::VARCHAR[], 
        1.0::DECIMAL, 
        0
    FROM currencies
    WHERE currency_id = 'Chase UR' -- Input Parameter 1

    UNION ALL

    -- Recursive Step: Traverse edges
    SELECT 
        tp.target_currency, 
        tp.path || tp.target_currency, 
        tp.total_ratio * t.transfer_ratio, 
        tp.steps + 1
    FROM transfer_path tp
    JOIN transfer_partners t ON tp.current_currency = t.source_currency
    WHERE NOT t.target_currency = ANY(tp.path) -- Prevent cycles
)
SELECT 
    path, 
    total_ratio, 
    (75000 / total_ratio)::INT as bank_points_needed -- Input Parameter 2 (Points Needed)
FROM transfer_path
WHERE current_currency = 'Aeroplan' -- Input Parameter 3
ORDER BY bank_points_needed ASC
LIMIT 1;
