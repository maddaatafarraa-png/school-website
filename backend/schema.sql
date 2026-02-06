CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  name VARCHAR(100),
  password VARCHAR(255),
  role VARCHAR(50)
);

CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE library (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  date_added DATE DEFAULT CURRENT_DATE
);

CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  position VARCHAR(100),
  bio TEXT
);