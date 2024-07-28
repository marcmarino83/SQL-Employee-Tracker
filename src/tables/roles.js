const queries = require('../../db/queries');

// Function to get all roles
const getAllRoles = async () => {
    try {
        const roles = await queries.viewRoles();
        return roles;
    } catch (err) {
        console.error('Error retrieving roles:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Function to add a new role
const addRole = async (title, salary, departmentId) => {
    try {
        await queries.addRole(title, salary, departmentId);
        console.log('Role added successfully!');
    } catch (err) {
        console.error('Error adding role:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Define other role-related functions if needed

module.exports = {
    getAllRoles,
    addRole,
};