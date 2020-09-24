
DROP TABLE IF EXISTS resources CASCADE;

CREATE TABLE resources  (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  url text NOT NULL,
  description VARCHAR(255) NOT NULL,
  category  VARCHAR(255) NOT NULL,
  created_at timestamp,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
