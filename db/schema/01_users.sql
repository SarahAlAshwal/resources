-- Drop and recreate Users table (Example)
CREATE DATABASE midterm;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  frist_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(225) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

