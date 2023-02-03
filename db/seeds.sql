INSERT INTO departments (name)
VALUES ('Sales'), ('Accounting'), ('Engineering');

INSERT INTO roles (title, salary, departments_id)
VALUES ('Sales Manager', 120000, 1),
        ('Accountant', 90000, 2),
        ('Engineer Intern', 60000, 3);

INSERT INTO employees (first_name, last_name, roles_id)
VALUES ('Glenn', 'Danzig', 1),
        ('Davey', 'Havok', 2),
        ('Sufjan', 'Stevens', 3);