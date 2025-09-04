-- Enable the UUID extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables and types to start fresh on each run
-- "CASCADE" will also drop dependent objects like indexes
DROP TABLE IF EXISTS steps;
DROP TABLE IF EXISTS tours;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS user_role;

-- Create a custom type for user roles
CREATE TYPE user_role AS ENUM ('creator', 'viewer');

-- Create the users table using uuid_generate_v4()
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'creator' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the tours table
CREATE TABLE tours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the steps table
CREATE TABLE steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
    order_index INT NOT NULL,
    image_url VARCHAR(255),
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes on foreign keys for faster queries
CREATE INDEX idx_tours_owner_id ON tours(owner_id);
CREATE INDEX idx_steps_tour_id ON steps(tour_id);