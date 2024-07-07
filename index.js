const inquirer = require('inquirer');
const { Client } = require('pg');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries');

const client = new Client({
    user: 'your_username',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'your_password',
    port: 5432,
});

client.connect();

const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then((answers) => {
        switch (answers.action) {
            case 'View all departments':
                viewDepartments(client, mainMenu);
                break;
            case 'View all roles':
                viewRoles(client, mainMenu);
                break;
            case 'View all employees':
                viewEmployees(client, mainMenu);
                break;
            case 'Add a department':
                addDepartment(client, mainMenu);
                break;
            case 'Add a role':
                addRole(client, mainMenu);
                break;
            case 'Add an employee':
                addEmployee(client, mainMenu);
                break;
            case 'Update an employee role':
                updateEmployeeRole(client, mainMenu);
                break;
            default:
                client.end();
        }
    });
};

mainMenu();