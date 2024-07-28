const queries = require('../../db/queries');

// Function to get all departments
const getAllDepartments = async () => {
    try {
        const departments = await queries.viewDepartments();
        return departments;
    } catch (err) {
        console.error('Error retrieving departments:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Function to add a new department
const addDepartment = async (name) => {
    try {
        await queries.addDepartment(name);
        console.log('Department added successfully!');
    } catch (err) {
        console.error('Error adding department:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
};

// Define other department-related functions if needed

module.exports = {
    getAllDepartments,
    addDepartment,
    // Other functions
};
