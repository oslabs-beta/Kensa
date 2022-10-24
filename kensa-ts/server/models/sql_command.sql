CREATE TABLE users(
  id serial PRIMARY KEY,
  username varchar NOT NULL UNIQUE,
  password varchar NOT NULL
);

CREATE TABLE projects(
  id serial PRIMARY KEY,
  project_name varchar NOT NULL,
  api_key varchar UNIQUE,
  server_url varchar,
  user_id integer NOT NULL
);

CREATE TABLE history_log(
  id serial PRIMARY KEY,
  query_string varchar NOT NULL,
  project_id integer NOT NULL,
  execution_time integer NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  success boolean NOT NULL
);

INSERT INTO users(username, password) VALUES(brian, 'a123') RETURNING *;

INSERT INTO projects(project_name, api_key, server_url, user_id)
VALUES('rick and morty', '123456789', 'http://localhost:3000/graphql', 1) RETURNING *;

INSERT INTO history_log(query_string, project_id, execution_time, success)
VALUES('first query', 2, 12, true) RETURNING *;

SELECT h.*, p.project_name, p.api_key, p.user_id FROM history_log AS h INNER JOIN projects AS p ON h.project_id = p.id WHERE p.id = 2;