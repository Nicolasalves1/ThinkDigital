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

CREATE TABLE turnos(
    id INT,
    turno VARCHAR(255) NOT NULL,
    worker_id INT,
    INDEX wk_id (worker_id),
    FOREIGN KEY (worker_id)
        REFERENCES workers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


INSERT INTO workers (id, name, password) VALUES
('João Torres', '123'),
('Marcus Silva', '321'),
('Miguel Rocha', '543'),
('Yara Moreto', '4321');

CREATE TABLE intermediate_table (
    id        INT,
    worker_id INT,
    shift_id  INT,
    team_id   INT,
    
    FOREIGN KEY (worker_id) REFERENCES workers(id),
    FOREIGN KEY (shift_id) REFERENCES shifts(id),
    FOREIGN KEY (team_id) REFERENCES teams(id),

    INDEX wk_ind (worker_id),
    INDEX st_id (shift_id),
    INDEX tm_ind (team_id)
);


ALTER TABLE intermediate_table 
ADD line_id