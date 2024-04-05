-- IF YOU RUN THIS ON PRODUCTION I'LL MURDER YOUR FAMILY IN FRONT OF YOU!

-- Drop procedures
DROP PROCEDURE IF EXISTS send_message_to_warehouse_by_name;
DROP PROCEDURE IF EXISTS create_workdays_schedule;

-- Purge tables
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS warehouse_availabilities;
DROP TABLE IF EXISTS warehouses;
DROP TABLE IF EXISTS food;

-- Purge types
DROP TYPE IF EXISTS australian_address;
DROP TYPE IF EXISTS dietary_tags;
DROP TYPE IF EXISTS weekday;
DROP TYPE IF EXISTS food_storage;
