const inquirer = require('inquirer');
const { Client } = require('pg');
const { getAllDepartments, addDepartment } = require('./tables/department');
const { getAllEmployees, addEmployee, updateEmployeeRole } = require('./tables/employee');
const { getAllRoles, addRole } = require('./tables/roles');

const client = new Client({
    user: 'your_username',    // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'employee_tracker',
    password: 'your_password', // Replace with your PostgreSQL password
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
    ]).then(async (answers) => {
        switch (answers.action) {
            case 'View all departments':
                await getAllDepartments();
                mainMenu();
                break;
            case 'View all roles':
                await getAllRoles();
                mainMenu();
                break;
            case 'View all employees':
                await getAllEmployees();
                mainMenu();
                break;
            case 'Add a department':
                await addDepartmentPrompt();
                break;
            case 'Add a role':
                await addRolePrompt();
                break;
            case 'Add an employee':
                await addEmployeePrompt();
                break;
            case 'Update an employee role':
                await updateEmployeeRolePrompt();
                break;
            default:
                client.end();
                console.log('Goodbye!');
        }
    });
};

// Function to prompt user for department details and add it
const addDepartmentPrompt = async () => {
    try {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        });
        await addDepartment(name);
        console.log('Department added successfully!');
    } catch (err) {
        console.error('Error adding department:', err);
    }
    mainMenu();
};

// Function to prompt user for role details and add it
const addRolePrompt = async () => {
    try {
        const { title, salary, departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
                validate: input => !isNaN(parseFloat(input)) || 'Salary must be a number'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID for the role:',
                validate: input => !isNaN(parseInt(input)) || 'Department ID must be a number'
            }
        ]);
        await addRole(title, parseFloat(salary), parseInt(departmentId));
        console.log('Role added successfully!');
    } catch (err) {
        console.error('Error adding role:', err);
    }
    mainMenu();
};

// Function to prompt user for employee details and add it
const addEmployeePrompt = async () => {
    try {
        const departments = await getAllDepartments(); // To get available department IDs
        const roles = await getAllRoles(); // To get available role IDs
        
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role of the employee:',
                choices: roles.map(role => ({ name: role.title, value: role.id }))
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the ID of the manager (leave blank if none):',
                validate: input => input === '' || !isNaN(parseInt(input)) || 'Manager ID must be a number'
            }
        ]);
        await addEmployee(firstName, lastName, parseInt(roleId), managerId === '' ? null : parseInt(managerId));
        console.log('Employee added successfully!');
    } catch (err) {
        console.error('Error adding employee:', err);
    }
    mainMenu();
};

// Function to prompt user for employee ID and new role, then update employee role
const updateEmployeeRolePrompt = async () => {
    try {
        const employees = await getAllEmployees(); // To get available employee IDs
        const roles = await getAllRoles(); // To get available role IDs
        
        const { employeeId, newRoleId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
            },
            {
                type: 'list',
                name: 'newRoleId',
                message: 'Select the new role for the employee:',
                choices: roles.map(role => ({ name: role.title, value: role.id }))
            }
        ]);
        await updateEmployeeRole(employeeId, newRoleId);
        console.log('Employee role updated successfully!');
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
    mainMenu();
};

mainMenu();
