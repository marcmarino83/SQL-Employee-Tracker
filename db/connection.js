const { Client } = require('pg');

const client = new Client({
    user: 'postgres',    // Replace with your PostgreSQL username
    host: 'localhost:3001',
    database: 'employee_tracker',
    password: 'password@123', // Replace with your PostgreSQL password
    port: 5432,
});

client.connect();

module.exports = client;