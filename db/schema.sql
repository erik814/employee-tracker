DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departments_id INT NOT NULL,
    FOREIGN KEY (departments_id)
        REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roles_id INT NOT NULL,
    FOREIGN KEY (roles_id)
        REFERENCES roles(id),
    manager_id INT,
    FOREIGN KEY (manager_id)
        REFERENCES employees(id)
);