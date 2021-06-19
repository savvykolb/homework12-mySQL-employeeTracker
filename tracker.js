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

const homeQuestionsclear = () => {
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