# Employee Tracker

## Description

The Employee Tracker application is a command-line tool designed to help manage employee information within an organization. It allows users to:

- **View all departments**: List all departments in the organization.
- **View all roles**: Display all roles and their associated salaries.
- **View all employees**: List all employees with their respective roles and managers.
- **Add a department**: Create a new department.
- **Add a role**: Add a new role with a title, salary, and associated department.
- **Add an employee**: Insert a new employee with a role and optional manager.
- **Update an employee role**: Modify the role of an existing employee.

The application uses PostgreSQL for data storage and management and Inquirer.js for user prompts.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Walkthrough Video](#walkthrough-video)
4. [Contributing](#contributing)
5. [License](#license)

## Installation

1. **Clone the Repository:**

   Open VSCode and open a new terminal. Clone the repository using:

   ```bash
   git clone https://github.com/your-username/employee-tracker.git

2. ## **Navigate to the Project Directory:**

    Change to the project directory:

    ```bash
    cd SQL-Employee-Tracker
    ```

3. ## **Install Dependencies:**

    Ensure you have Node.js and npm installed. Run the following command in the terminal to install the necessary packages:

    ```bash
    npm install
    ```

4. ## **Set Up the Database:**

    Set Up the Database

    - **Ensure PostgreSQL is Installed:** Make sure PostgreSQL is installed and running on your machine.

    - **Configure PostgreSQL:** Update your PostgreSQL username and password in src/index.js.

    - **Run SQL Scripts:** Open a new terminal tab and run the following commands to set up the database schema and seed data:

    ```bash
    psql -U your_username -f db/schema.sql
    psql -U your_username -f db/seeds.sql

## Usage

1. **Start the Application:**

    In VSCode, open a terminal and run:

    ``` bash
    node src/index.js

2. **Follow the Prompts:**

    The application will present a series of prompts based on the actions you want to perform (e.g., viewing departments, adding a role).

3. **Navigate Through Menus:**

    Use the command line interface to navigate through different options and perform actions as needed.


## **Walkthrough Video**

A walkthrough video demonstrating the functionality of the application can be found here.

## **Contributing**

1. **Fork the Repository:**

    Click on the "Fork" button on the top right of the repository page on GitHub.

2. **Create a Feature Branch:**

    In the VSCode terminal, create a new branch for your feature:

    ```bash
    git checkout -b feature/your-feature

3. **Commit Your Changes:**

    Add and commit your changes with:

    ```bash
    git add .
    git commit -m "Add a new feature"
    Push to Your Fork:

4. **Push your changes to your GitHub fork:**

    ```bash
    git push origin feature/your-feature

5. **Submit a Pull Request:**

    Navigate to the original repository on GitHub and submit a pull request from your fork.

## **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## **Additional Notes:**

- .gitignore: Ensure your .gitignore file includes node_modules/ and .DS_Store/ to avoid tracking unnecessary files.

- Dependencies: The project includes a package.json file created using npm init, which tracks all necessary dependencies.

- Repository Quality: Ensure the repository is properly named, follows best practices for file structure, and contains meaningful commit messages.

