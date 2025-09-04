-- Add columns to the 'users' table for password reset functionality
ALTER TABLE users
ADD COLUMN password_reset_token VARCHAR(255) NULL,
ADD COLUMN password_reset_expires TIMESTAMPTZ NULL;