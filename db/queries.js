const client = require('./connection');

// Function to view all departments
const viewDepartments = async (client, callback) => {
    try {
        const res = await client.query('SELECT * FROM department');
        console.table(res.rows);
    } catch (err) {
        console.error('Error viewing departments:', err);
    }
    callback();
};

// Function to view all roles
const viewRoles = async (client, callback) => {
    try {
        const res = await client.query(`
            SELECT role.id, role.title, role.salary, department.name AS department
            FROM role
            JOIN department ON role.department_id = department.id
        `);
        console.table(res.rows);
    } catch (err) {
        console.error('Error viewing roles:', err);
    }
    callback();
};

// Function to view all employees
const viewEmployees = async (client, callback) => {
    try {
        const res = await client.query(`
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id
        `);
        console.table(res.rows);
    } catch (err) {
        console.error('Error viewing employees:', err);
    }
    callback();
};

// Function to add a department
const addDepartment = async (client, callback) => {
    try {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        });
        await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log('Department added successfully!');
    } catch (err) {
        console.error('Error adding department:', err);
    }
    callback();
};

// Function to add a role
const addRole = async (client, callback) => {
    try {
        const { title, salary, departmentId } = await inquirer.prompt([
            { type: 'input', name: 'title', message: 'Enter the role title:' },
            { type: 'input', name: 'salary', message: 'Enter the role salary:' },
            { type: 'input', name: 'departmentId', message: 'Enter the department ID for this role:' }
        ]);
        await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
        console.log('Role added successfully!');
    } catch (err) {
        console.error('Error adding role:', err);
    }
    callback();
};

// Function to add an employee
const addEmployee = async (client, callback) => {
    try {
        const rolesRes = await client.query('SELECT id, title FROM role');
        const roles = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));
        const managersRes = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
        const managers = managersRes.rows.map(manager => ({ name: manager.name, value: manager.id }));

        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
            { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
            { type: 'list', name: 'roleId', message: 'Select the employee\'s role:', choices: roles },
            { type: 'list', name: 'managerId', message: 'Select the employee\'s manager:', choices: [...managers, { name: 'None', value: null }] }
        ]);
        await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
        console.log('Employee added successfully!');
    } catch (err) {
        console.error('Error adding employee:', err);
    }
    callback();
};

// Function to update an employee role
const updateEmployeeRole = async (client, callback) => {
    try {
        const employeesRes = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
        const employees = employeesRes.rows.map(emp => ({ name: emp.name, value: emp.id }));
        const rolesRes = await client.query('SELECT id, title FROM role');
        const roles = rolesRes.rows.map(role => ({ name: role.title, value: role.id }));

        const { employeeId, newRoleId } = await inquirer.prompt([
            { type: 'list', name: 'employeeId', message: 'Select the employee to update:', choices: employees },
            { type: 'list', name: 'newRoleId', message: 'Select the new role:', choices: roles }
        ]);
        await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
        console.log('Employee role updated successfully!');
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
    callback();
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
