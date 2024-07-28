const queries = require('../../db/queries');

// Function to get all employees
const getAllEmployees = async () => {
    try {
        const employees = await queries.viewEmployees();
        return employees;
    } catch (err) {
        console.error('Error retrieving employees:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Function to add a new employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        await queries.addEmployee(firstName, lastName, roleId, managerId);
        console.log('Employee added successfully!');
    } catch (err) {
        console.error('Error adding employee:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Function to update an employee's role
const updateEmployeeRole = async (employeeId, newRoleId) => {
    try {
        await queries.updateEmployeeRole(employeeId, newRoleId);
        console.log('Employee role updated successfully!');
    } catch (err) {
        console.error('Error updating employee role:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Function to update an employee's manager
const updateEmployeeManager = async (employeeId, newManagerId) => {
    try {
        await queries.updateEmployeeManager(employeeId, newManagerId);
        console.log('Employee manager updated successfully!');
    } catch (err) {
        console.error('Error updating employee manager:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Define other employee-related functions if needed

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager, // Include other functions
};