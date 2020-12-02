create database employee_db;
use employee_db;

create table employee (
id integer auto_increment not null,
first_name varchar(30),
last_name varchar(30),
role_id integer,
primary key (id)
);

INSERT INTO employee (first_name, last_name, role_id) values ("Matt", "Harris", 1);
INSERT INTO employee (first_name, last_name, role_id) values ("David", "Johnson", 2);
INSERT INTO employee (first_name, last_name, role_id) values ("Hisham", "Kader", 3);
INSERT INTO employee (first_name, last_name, role_id) values ("John", "Rogers", 4);
INSERT INTO employee (first_name, last_name, role_id) values ("Thomas", "Player", 5);

CREATE TABLE role (
id integer auto_increment not null,
title varchar(30),
salary decimal (10,2),
department_id integer,
primary key (id)
);
INSERT INTO role (title, salary, department_id) values ("head programmer", 90, 1);
INSERT INTO role (title, salary, department_id) values ("marketing team", 100, 2);
INSERT INTO role (title, salary, department_id) values ("lead developer", 100, 3);
INSERT INTO role (title, salary, department_id) values ("IT", 60, 4);
INSERT INTO role (title, salary, department_id) values ("programmer", 80, 5);

CREATE TABLE department (
id integer auto_increment not null,
name varchar(30),
primary key (id)
);

INSERT INTO department (name) values ("head programmer");
INSERT INTO department (name) values ("marketing team");
INSERT INTO department (name) values ("lead developer");
INSERT INTO department (name) values ("IT");
INSERT INTO department (name) values ("programmer");

select * from department;

select * from role;

select * from employee;



SELECT e.first_name, e.last_name, r.title, r.salary, d.name FROM employee e
INNER JOIN role r on e.role_id = r.id
INNER JOIN department d on r.department_id = d.id
ORDER BY d.name;