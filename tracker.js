const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('WORKING!!!!!!!')
    homeQuestions();
});

const homeQuestions = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Job Roles',
                'Add New Employee',
                'Update Existing Employee',
                'Remove Existing Employee',
                'Add New Department',
                'Update Existing Department',
                'Remove Existing Department',
                'Add New Job Role',
                'Update Existing Job Role',
                'Remove Existing Job Role',
                'End Program',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    allEmployees();
                    break;

                case 'View All Departments':
                    allDepartments();
                    break;

                case 'View All Roles':
                    allRoles();
                    break;

                case 'Add New Employee':
                    addEmployee();
                    break;

                case 'Update Existing Employee':
                    updateEmployee();
                    break;

                case 'Remove Existing Employee':
                    RemoveEmployee();
                    break;

                case 'Add New Department':
                    addDepartment();
                    break;

                case 'Update Existing Department':
                    updateDepartment();
                    break;

                case 'Remove Existing Department':
                    RemoveDepartment();
                    break;

                case 'Add New Job Role':
                    addJobRole();
                    break;

                case 'Update Existing Job Role':
                    updateEmployee();
                    break;

                case 'Remove Existing Job Role':
                    RemoveEmployee();
                    break;

                case 'End Program':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const allEmployees = () => {
    connection.query(

        "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name,' ', m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN role ON e.role_id = role.id JOIN department ON department.id = role.department_id ORDER BY department.name,m.first_name, e.first_name ASC",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            homeQuestions();
        }
    )
};



// -- employee id 1st column(rest of row built from that specific id), then we are combining first and last name in the second column titled as EMPLOYEE, then from table ROLE pull the TITLE and title column as TITLE, then same for department and salary then combine manager's first and last name and create column MANAGER.
// -- Left-Join statement: Pulling manager information by saying look at ALL employee ids and ONLY match manager id where employee manager and manager id are the same => m.id = e.manager_id is needed because the manager is also still an employee and that is how it gets info. 
// -- JOIN statement: e.role_id = role.id => Selects ALL employee role_ids and Role ids same for department.
// -- Order By => Sorts data by department, then manager first, then by alphabetical first name.
// -- https://www.w3schools.com/sql/sql_foreignkey.asp , https://www.w3schools.com/sql/sql_join.asp