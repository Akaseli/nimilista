CREATE DATABASE nimilista;
\c nimilista

CREATE TABLE people(id SERIAL PRIMARY KEY,firstname text,lastname text,age integer);