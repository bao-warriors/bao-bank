-- Create the schema

-- Declare types
CREATE TYPE australian_address AS (
  -- That can be anything or null. God save the arse of the validator
  street_number text,
  -- Street name can also be anything, but at least, it has to exist
  street_name text,
  -- Shire or suburb
  locality text,
  -- Got to do postcode validation eventually
  postcode char(4),
  -- Validate whether that state exists. Hopefully, they don't add 4-char states for the meantime
  state varchar(3)
);
CREATE TYPE dietary_tags AS ENUM ('Vegetarian', 'Vegan', 'Gluten-free', 'Nut-free');
CREATE TYPE food_storage AS ENUM ('shelf', 'refrigerated', 'frozen');

CREATE TABLE
  warehouses (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    address australian_address NOT NULL,
    created timestamp DEFAULT current_timestamp NOT NULL,
    accepting boolean DEFAULT FALSE NOT NULL,
    active boolean DEFAULT TRUE NOT NULL,
    last_login timestamp
    -- TODO: Figure out a way to store availability
  );

-- Create tables
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
    dietary_tags dietary_tags[],
    location uuid REFERENCES warehouses(id)
  );
