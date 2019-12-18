CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department
    (
        id INT AUTO_INCREMENT,
        dept VARCHAR(30) NOT NULL,
        PRIMARY KEY(id)
    );

CREATE TABLE role
    (
        id INT AUTO_INCREMENT,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL(10, 2) NOT NULL,
        department_id INT NOT NULL,
        PRIMARY KEY(id),
        REFERENCES department(id)
    );

CREATE TABLE employee
    (
        id INT AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT,
        PRIMARY KEY(id),
        REFERENCES role(id),
        REFERENCES employee(id)
    );

INSERT INTO department(dept) VALUES("Account Management");
INSERT INTO department(dept) VALUES("Loss Mitigation");
INSERT INTO department(dept) VALUES("Compliance");
INSERT INTO department(dept) VALUES("App Dev");

INSERT INTO role(title, salary, department_id) VALUES("Account Manager", 60000, 1);
INSERT INTO role(title, salary, department_id) VALUES("AVP", 80000, 1);
INSERT INTO role(title, salary, department_id) VALUES("Underwriter", 70000, 2);
INSERT INTO role(title, salary, department_id) VALUES("VP", 100000, 2);
INSERT INTO role(title, salary, department_id) VALUES("QA Specialist", 50000, 3);
INSERT INTO role(title, salary, department_id) VALUES("SQL Developer", 120000, 4);


INSERT INTO employee(first_name, last_name, role_id) VALUES("Palikan", "James", 1);
INSERT INTO employee(first_name, last_name, role_id) VALUES("Zaprowski", "Justin", 1);
INSERT INTO employee(first_name, last_name, role_id) VALUES("Little", "Tamara", 2);
INSERT INTO employee(first_name, last_name, role_id) VALUES("Donovan", "Matthew", 2);
INSERT INTO employee(first_name, last_name, role_id) VALUES("Leasure", "Greg", 3);
INSERT INTO employee(first_name, last_name, role_id) VALUES("Pataky", "Gabriel", 4);




