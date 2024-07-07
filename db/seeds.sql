INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 90000, 1), 
('Sales Manager', 80000, 2), 
('Marketing Coordinator', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Sam', 'Williams', 3, 2);