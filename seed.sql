USE employee_trackerDB;

INSERT INTO department (name)
VALUES  ('Sales'),
		('Office Administration'), 
		('Accounting'),
 		('Human Resources'),
		('Miscellaneous'),
		('Warehouse');

         SELECT * FROM department;

INSERT INTO role
    (title, salary, department_id)
VALUES  ('Branch Manager', 65000, 1),
        ('Salesman', 45000, 1),
        ('Assistant to Manager', 45000, 1),
		
        
        ('Office Administrator', 52000,2),
        ('Receptionist', 35000, 2),

        ('Head of Accounting', 58000, 3),
        ('Accountant', 50000, 3),

        ('Human Resource Manager', 75000, 4),
        ('Temp', 20000, 4),
        
        ('Supplier Relations', 48000, 5),
        ('Quality Assurance Director', 160000, 5),
        ('Customer Service Specialist', 160000, 5),
        
        ('Warehouse Foreman', 68000, 6),
        ('Warehouse Employee', 45000, 6);
        
        SELECT * FROM role;
        
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES  ('Michael', 'Scott', 1, NULL),
        ('Jim', 'Halpert', 2, 1),
        ('Dwight', 'Schrute', 3, 1),
        ('Pam', 'Beesly', 4, 1),
        ('Angela', 'Martin', 5, NULL),
        ('Kelly', 'Kapoor', 6, 1),
        ('Andy', 'Bernard', 7, 1),
        ('Ryan', 'Howard', 8, 1),
        ('Creed', 'Bratton', 9, 1),
        ('Toby', 'Flenderson', 10, NULL),
        ('Kevin', 'Malone', 11, 5),
        ('Stanley', 'Hudson', 12, 1),
        ('Phyllis', 'Vance', 13, 1),
        ('Daryll', 'Philbin', 14, NULL);
        
        SELECT * FROM employee;