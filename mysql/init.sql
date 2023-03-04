
CREATE DATABASE mydatabase;

USE mydatabase;

CREATE TABLE mytable (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(50),
  PRIMARY KEY (id)
);

INSERT INTO mytable (name, email) VALUES
  ('John Doe', 'john.doe@example.com'),
  ('Jane Doe', 'jane.doe@example.com');

CREATE TABLE mysql.plugin (
    name varchar(64) COLLATE utf8mb4_0900_ai_ci NOT NULL,
    dl   varchar(128) COLLATE utf8mb4_0900_ai_ci NOT NULL,
    PRIMARY KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

