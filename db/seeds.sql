INSERT INTO department (name)
VALUES ('Sales'), ('Accounting'), ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 120000, 1),
        ('Accountant', 90000, 2),
        ('Engineer Intern', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Glenn', 'Danzig', 1),
        ('Davey', 'Havok', 2),
        ('Sufjan', 'Stevens', 3);