CREATE TABLE projects(
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  description varchar NOT NULL,
  status varchar NOT NULL,
  client_id integer NOT NULL
);

CREATE TABLE clients(
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  email varchar NOT NULL,
  phone varchar NOT NULL
);

INSERT INTO projects(name, description, status, client_id)
VALUES ('eCommerce Website', 'Description 1', 'new', 1) RETURNING *;

INSERT INTO clients(name, email, phone) VALUES ('Tony Stark', 'ironman@gmail.com', '343-567-4333') RETURNING *;