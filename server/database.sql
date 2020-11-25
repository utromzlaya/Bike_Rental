CREATE DATABASE bikesrent;

CREATE TABLE bikes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    type VARCHAR(300),
    price NUMERIC
);
iNSERT INTO bikes VALUES (10000, 'Example from server2', 'Example2', 15);

CREATE TABLE rented(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    type VARCHAR(300),
    price NUMERIC
);

iNSERT INTO rented VALUES (1000, 'Example from server', 'Example', 9000);