const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('\n W E L C O M E  TO  D U N D E R  &  M I F F L I N!! \n');
    console.log('Limitless Paper in a Paperless World. \n');
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
                'Update Existing Employee Role',
                'Remove Existing Employee',
                'Add New Department',
                'Remove Existing Department',
                'Add New Job Role',
                'Update Existing Job Role Salary',
                'Remove Existing Job Role',
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

                case 'Update Existing Employee Role':
                    updateEmployee();
                    break;

                case 'Remove Existing Employee':
                    removeEmployee();
                    break;

                case 'Add New Department':
                    addDepartment();
                    break;

                case 'Remove Existing Department':    
                    removeDepartment();
                    break;

                case 'Add New Job Role':
                    addJobRole();
                    break;

                case 'Update Existing Job Role Salary':    //To update Salary extra
                    updateJobRole();
                    break;

                case 'Remove Existing Job Role':     
                    removeJobRole();
                    break;

                case 'End Program':
                    connection.end();
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

//BUGS: You have to pick a manager, The return console log onlys tells users the id numbers, not title and m. names. 
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
                                // || null
                            }
                        })
                    },
                ]).then((answer) => {
                    connection.query(
                        "INSERT INTO employee SET ?", answer, (err) => {
                            if (err) throw err;
                            console.log(
                                `\n E M P L O Y E E  A D D E D !! \n \n || Employee Name: ${answer.first_name + ' ' + answer.last_name}|| Job Role: ${answer.role_id} || Manager Name: ${answer.manager_id} || \n`
                            );
                            homeQuestions();
                        });
                });
        });
    });
};

//BUGS: employee and job role are id numbers instead of names in console log
const updateEmployee = () => {
    connection.query("SELECT * FROM employee", (err, employee) => {
        if (err) throw err;

        connection.query("SELECT * FROM role", (err, role) => {
            if (err) throw err;

            inquirer
                .prompt([
                    {
                        name: "employee_id",
                        type: "list",
                        message: "Select the existing employee you would like to update.",
                        choices: employee.map(employee => {
                            return {
                                name: `${employee.first_name} ${employee.last_name}`,
                                value: employee.id
                            }
                        })
                    },
                    {
                        name: "role_id",
                        type: "list",
                        message: "Select the new job role the chosen employee.",
                        choices: role.map(role => {
                            return {
                                name: role.title,
                                value: role.id
                            }
                        })
                    }
                ]).then((answer) => {
                    connection.query("UPDATE employee SET ? WHERE ?",
                        [
                            {
                                role_id: answer.role_id
                            },
                            {
                                id: answer.employee_id
                            }
                        ], (err) => {
                            if (err) throw err;
                            console.log(
                                `\n E M P L O Y E E  U D A T E D !! \n \n || Employee ID: ${answer.employee_id}|| Job Role ID: ${answer.role_id} \n`
                            );
                            homeQuestions();
                        });
                });
        })
    })
};

// NOT A BUG BUT QUESTION!!!
const removeEmployee = () => {
    connection.query("SELECT * FROM employee", (err, employee) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: 'employee_removed',
                    type: 'list',
                    message: 'Select the employee you would like to remove.',
                    choices: employee.map(employee => {
                        return {
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        }
                    })
                },
            ]).then((answer) => {
                // console.log('answer:', answer);
                let delEmployee = answer.employee_removed;
                const query = 'DELETE FROM employee WHERE id = ?';
                connection.query(
                    query, delEmployee, (err) => {
                        if (err) throw err;
                        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WHY DID THIS NOT WORK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                        // connection.query("DELETE FROM employee WHERE id = ?"),
                        //     {
                        //        id: answer.employee_removed
                        //     },
                        //     (err) => {
                        //     if (err) throw err;
                        console.log(
                            `\n E M P L O Y E E  D E L E T E D !! \n \n || Employee ID: ${answer.employee_removed} || \n`
                        );
                        homeQuestions();
                    });
            });
    });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'Enter new departments name.'
            }
        ]).then((answer) => {
            connection.query(
                "INSERT INTO department SET ?", answer, (err, res) => {
                    if (err) throw err;
                    console.log(`\n N E W  D E P A R T M E N T  A D D E D!! \n  || Department Name: ${answer.name} || \n`);
                    homeQuestions();
                })
        })

};

const removeDepartment = () => {
    connection.query("SELECT * FROM department", (err, department) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: 'department_removed',
                    type: 'list',
                    message: 'Select the Department you would like to remove.',
                    choices: department.map(department => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    })
                },
            ]).then((answer) => {
                let delEmployee = answer.department_removed;
                const query = 'DELETE FROM department WHERE id = ?';
                connection.query(
                    query, delEmployee, (err) => {
                        if (err) throw err;
                        console.log(
                            `\n D E P A R T M E N T  D E L E T E D !! \n \n || Job Role ID: ${answer.department_removed} || \n`
                        );
                        homeQuestions();
                    });
            });
    });
};

//BUG: department shows up as id -> not name
const addJobRole = () => {
    connection.query("SELECT * FROM department", (err, department) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'Enter new job role title.'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Enter the base annual salary for new job role.',
                    validate: (value) => {
                        return !isNaN(value) ? true : "Please provide a number value.";
                    }
                },
                {
                    name: 'name',
                    type: 'list',
                    message: 'Select the department new job role will be assigned to.',
                    choices: department.map(department => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    })
                },
            ]).then((answer) => {
                connection.query(
                    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.title, answer.salary, answer.department_id], (err) => {
                        if (err) throw err;
                        console.log(
                            `\n N E W  J O B  R O L E  A D D E D !! \n \n || Job Role: ${answer.title}|| Salary: ${answer.salary} || Department: ${answer.name} || \n`
                        );
                        homeQuestions();
                    });
            });
    });
};

const updateJobRole = () => {
    connection.query("SELECT * FROM role", (err, role) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "job_role",
                    type: "list",
                    message: "Select the job role you would like to update.",
                    choices: role.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                },
                {
                    name: "update_salary",
                    type: "input",
                    message: "Enter in the new annual base salary for the job role selected.",
                },

            ]).then((answer) => {
                connection.query("UPDATE role SET ? WHERE ?",
                    [
                        {
                            salary: answer.update_salary
                        },
                        {
                            id: answer.job_role
                        }
                    ], (err) => {
                        if (err) throw err;
                        console.log(
                            `\n S A L A R Y  U D A T E D !! \n \n || Job Role ID: ${answer.job_role} || New Salary: ${answer.update_salary}|| \n`
                        );
                        homeQuestions();
                    });
            });
    })
};

const removeJobRole = () => {
    connection.query("SELECT * FROM role", (err, role) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: 'role_removed',
                    type: 'list',
                    message: 'Select the job role you would like to remove.',
                    choices: role.map(role => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                },
            ]).then((answer) => {
                let delEmployee = answer.role_removed;
                const query = 'DELETE FROM role WHERE id = ?';
                connection.query(
                    query, delEmployee, (err) => {
                        if (err) throw err;
                        console.log(
                            `\n J O B  R O L E  D E L E T E D !! \n \n || Job Role ID: ${answer.role_removed} || \n`
                        );
                        homeQuestions();
                    });
            });
    });
};



// To-do:
//  - complete rest of functions and MediaQueryListEvent
//  - add the art to each function