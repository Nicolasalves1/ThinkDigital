CREATE TABLE login_data (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO login_data (id, password) 
VALUES ('Douglas', '1');