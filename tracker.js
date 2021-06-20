const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// var connection = mysql.createConnection({multipleStatements: true});

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
    console.log(` \n`);
    console.log('W E L C O M E  TO  D U N D E R  &  M I F F L I N!!')
    console.log(` \n`);
    console.log('Limitless Paper in a Paperless World.')
    console.log(` \n`);
    homeQuestions();
});

const homeQuestions = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Current Employees',
                'View All Departments',
                'View All Job Roles',
                'Add New Employee',
                'Update Existing Employee',
                // 'Remove Existing Employee',
                'Add New Department',
                'Update Existing Department',
                // 'Remove Existing Department',
                'Add New Job Role',
                'Update Existing Job Role',
                // 'Remove Existing Job Role',
                'End Program',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Current Employees':
                    allEmployees();
                    break;

                case 'View All Departments':
                    allDepartments();
                    break;

                case 'View All Job Roles':
                    allRoles();
                    break;

                case 'Add New Employee':
                    addEmployee();
                    break;

                case 'Update Existing Employee':
                    updateEmployee();
                    break;

                // case 'Remove Existing Employee':
                //     removeEmployee();
                //     break;

                case 'Add New Department':
                    addDepartment();
                    break;

                case 'Update Existing Department':
                    updateDepartment();
                    break;

                // case 'Remove Existing Department':
                //     removeDepartment();
                //     break;

                case 'Add New Job Role':
                    addJobRole();
                    break;

                case 'Update Existing Job Role':
                    updateEmployee();
                    break;

                // case 'Remove Existing Job Role':
                //     removeEmployee();
                //     break;

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
    console.log(` \n`);
    connection.query(
        //Going to see if I can find a way to shorten this
        "SELECT e.id,CONCAT(e.first_name, ' ', e.last_name) AS `Employee`, role.title AS `Title`, department.name AS `Department`, role.salary AS `Salary`, CONCAT(m.first_name,' ', m.last_name) AS `Manager`FROM employee AS e LEFT JOIN employee AS m ON m.id = e.manager_id JOIN role ON e.role_id = role.id JOIN department ON department.id = role.department_id ORDER BY department.name,m.first_name, e.first_name ASC",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            console.log(` \n`)
            homeQuestions();
        }
    )
};

const allDepartments = () => {
    console.log(` \n`);
    connection.query(
        "SELECT name AS `Departments` FROM employee_trackerDB.department ORDER BY name;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            console.log(` \n`)
            homeQuestions();
        }
    )
};

const allRoles = () => {
    console.log(` \n`);
    connection.query(
        "SELECT title AS `Job Role`, salary AS `Base Salary` FROM employee_trackerDB.role ORDER BY title;",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            console.log(` \n`)
            homeQuestions();
        }
    )
};

const addEmployee = () => {
    connection.query("SELECT * FROM role", (err, role) => {
        if (err) throw err;

        connection.query("SELECT * FROM employee", (err, employee) => {
            if (err) throw err;

            inquirer
                .prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'Enter new employees first name.'
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'Enter new employees last name.'
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        message: 'Select new employees job role.',
                        choices: role.map(role => {
                            return {
                                name: role.title,
                                value: role.id
                            }
                        })
                    },
                    {
                        name: 'manager_id',
                        type: 'list',
                        message: 'Select new employees manager.',
                        choices: employee.map(employee => {
                            return {
                                name: employee.first_name + " " + employee.last_name,
                                value: employee.id
                            }
                        })
                    },
                ]).then((answer) => {
                    connection.query(
                        "INSERT INTO employee SET ?", answer, (err, res) => {
                        if (err) throw err;
                        console.log( //THIS WILL PROBABLY NEED TO CHANGE - I DONT THINK IT WILL POPULATE CORRECTLY
                            `\n E M P L O Y E E  A D D E D !! \n || Employee Name: ${answer.first_name + ' ' + answer.last_name}|| Job Role: ${answer.role_id} || Manager Name: ${answer.manager_id} || \n`
                            );
                        homeQuestions();
                    });
                });
        });
    });
};
 





// To-do:
//  - complete rest of functions and MediaQueryListEvent
//  - add the art to each function