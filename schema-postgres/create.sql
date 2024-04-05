-- Create the schema

-- Declare types
-- Weekend-inclusive definition of weekdays
CREATE TYPE weekday AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
CREATE TYPE dietary_tag AS ENUM ('Vegetarian', 'Vegan', 'Gluten-free', 'Nut-free');
CREATE TYPE food_storage AS ENUM ('shelf', 'refrigerated', 'frozen');

CREATE TYPE australian_address AS (
    -- That can be anything or null. God save the arse of the validator
    street_number text,
    -- Str2eet name can also be anything, but at least, it has to exist
    street_name text,
    -- Shire or suburb
    locality text,
    -- Validate whether that state exists. Hopefully, they don't add 4-char states for the meantime
    state varchar(3),
    -- Got to do postcode validation eventually
    postcode char(4)
  );

-- Create tables
CREATE TABLE
  warehouses (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name text NOT NULL UNIQUE,
    address australian_address NOT NULL,
    created timestamp DEFAULT current_timestamp NOT NULL,
    accepting boolean DEFAULT FALSE NOT NULL,
    active boolean DEFAULT TRUE NOT NULL,
    availability availability
    -- TODO: Figure out a way to store availability
  );

CREATE TABLE
  warehouse_availabilities (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    warehouse uuid REFERENCES warehouses(id) not null,
    -- All day/time are saved acc
    start_day weekday NOT NULL,
    start_time time NOT NULL,
    end_day weekday NOT NULL,
    end_time time NOT NULL,
    -- Used IANA timezone identifiers. e.g.: 'Australia/Melbourne'
    timezone text NOT NULL CHECK (now() AT TIME ZONE timezone IS NOT NULL),
    /* Rules:
       - If valid_from is not null && (valid_until is null || valid_until > valid_from),
         then schedule takes effect from valid_from and ends on valid_after if exists.
       - If valid_until is not null && (valid_from is null || valid_from > valid_until),
         then schedule is valid until valid_until and takes effect from valid_from if exists.
    These rules allow setting breaks, holidays, etc.  */
    valid_from timestamp DEFAULT current_timestamp,
    valid_until timestamp
  );

CREATE TABLE
  messages (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    title text NOT NULL,
    body text,
    sent timestamp DEFAULT current_timestamp NOT NULL,
    receiver uuid REFERENCES warehouses(id)
  );

CREATE TABLE
  food (
    id uuid default uuid_generate_v4() not null primary key,
    name text,
    image_url text[],
    received timestamp,
    expiry timestamp,
    storage_instruction food_storage,
    dietary_tags dietary_tag[],
    location uuid REFERENCES warehouses(id)
  );

-- Declare QOL functions and procedures
-- Creates Monday-Friday schedule
CREATE PROCEDURE create_workdays_schedule
(warehouse_name text,
 start_time time, end_time time,
 timezone text)
    LANGUAGE plpgsql AS $$
DECLARE
    workdays weekday[] := array ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    workday weekday;
BEGIN
    FOREACH workday IN ARRAY workdays LOOP
            INSERT INTO
                warehouse_availabilities (warehouse,
                                          start_day, start_time,
                                          end_day, end_time,
                                          timezone)
            SELECT warehouses.id,
                   workday, start_time,
                   workday, end_time,
                   timezone
            FROM warehouses WHERE name = warehouse_name;
        END LOOP;
END $$;

-- Send message to warehouse by name
CREATE PROCEDURE send_message_to_warehouse_by_name(warehouse_name text, title text, body text)
    LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO
        messages (title, body, receiver)
    SELECT
        title,
        body,
        warehouses.id
    FROM warehouses WHERE name = warehouse_name;
END $$;