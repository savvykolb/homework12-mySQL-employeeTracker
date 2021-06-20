-- Create DATABASE AND TABLES
DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id int,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);


-- SELECT ALL EMPLOYEE QUERY
SELECT e.id,
	CONCAT(e.first_name, ' ', e.last_name) AS `Employee`, 
	role.title AS `Title`, 
	department.name AS `Department`, 
	role.salary AS `Salary`, 
	CONCAT(m.first_name,' ', m.last_name) AS `Manager`
FROM employee AS e 
LEFT JOIN employee AS m 
ON m.id = e.manager_id 
JOIN role ON e.role_id = role.id 
JOIN department ON department.id = role.department_id 
ORDER BY department.name,
	m.first_name, 
	e.first_name ASC;

-- SELECT ALL DEPARTMENTS QUERY
 SELECT name AS `Departments` FROM employee_trackerDB.department;
