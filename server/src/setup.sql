/* Komennot jolla saa databasen toimimaan projektin kanssa */

CREATE DATABASE nimilista;
CREATE TABLE people(id SERIAL PRIMARY KEY,firstname text,lastname text,age integer);