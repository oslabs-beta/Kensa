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
  operation_name varchar,
  query_string varchar NOT NULL,
  size integer,
  execution_time integer NOT NULL,
  project_id integer NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  success boolean NOT NULL
);

CREATE TABLE history_log_dev(
  id serial PRIMARY KEY,
  operation_name varchar,
  query_string varchar NOT NULL,
  size integer,
  execution_time integer NOT NULL,
  project_id integer NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  success boolean NOT NULL
);

DROP TABLE history_log_dev;

CREATE TABLE resolver_log_dev(
  id serial PRIMARY KEY,
  resolver_name varchar NOT NULL,
  execution_time integer NOT NULL,
  operation_id integer NOT NULL,
  success boolean NOT NULL,
  project_id integer NOT NULL
);

DROP TABLE resolver_log_dev;

'Get Operation request count'
SELECT COUNT(*) FROM history_log WHERE operation_name='GetAllClients';

'Sum Operation execution_time'
SELECT SUM(execution_time) FROM history_log WHERE operation_name='AddClient';

SELECT h.*, p.project_name, p.api_key, p.user_id FROM history_log AS h INNER JOIN projects AS p ON h.project_id = p.id WHERE p.id = 2;