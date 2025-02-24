CREATE TABLE login_data (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO login_data (id, password) 
VALUES ('Douglas', '1');


CREATE TABLE workers (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL  
);

INSERT INTO workers (id, name, password) VALUES
('João Torres', '123'),
('Marcus Silva', '321'),
('Miguel Rocha', '543'),
('Yara Moreto', '4321');

