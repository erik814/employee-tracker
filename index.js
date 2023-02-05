const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

let employeesArray = [];
let rolesArray = [];

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to employee_db')
);


start();

function start(){
    console.log('started');
    inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            choices: 
                [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add Department',
                    'Add Role',
                    'Add Employee',
                    'Update Employee Role'
                ],
            name: 'initialChoice',
        })
        .then(selected =>{
            console.log(selected.initialChoice);

            if(selected.initialChoice === 'View All Departments'){
                viewDepartments();
            }else if(selected.initialChoice === 'View All Roles'){
                viewRoles();
            }else if(selected.initialChoice === 'View All Employees'){
                viewEmployees();
            }else if(selected.initialChoice === 'Add Department'){
                addDepartment();
            }else if(selected.initialChoice === 'Add Role'){
                addRole();
            }else if(selected.initialChoice === 'Add Employee'){
                addEmployee();
            }else if(selected.initialChoice === 'Update Employee Role'){
                employeeMap();
            }
        });
};



//second pages

function viewDepartments(){
    console.log('view departments function');
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    });
};

function viewRoles(){
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
    });
};

function viewEmployees(){
    db.query('SELECT * FROM employees', function (err, results){
        console.table(results);
    });
};

function addDepartment(){
    inquirer
        .prompt({
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name',
        })
        .then(selected => {
            // goes into the database and tells it to add a department with a name given
            // in the inquirer prompt above
            db.query('INSERT INTO departments(name) VALUES (?)', selected.name, (err, result) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`${selected.name} department added`)
                }
            });
        });
};

function addRole(){
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'name',
            },
            {
                type: 'input',
                message: "What is the role's salary?",
                name: 'salary',
                validate: function(value){
                    if (!isNaN(value && value > 0)){
                        return true;
                    }
                    return 'Please enter a number';
                }
            },
            {
                type: 'input',
                message: 'What is the ID for the department this role is associated with?',
                name: 'deptId',
                validate: function(value){
                    if (!isNaN(value) && value > 0){
                        return true;
                    }else{
                        return 'Please enter a number';
                    }
                }
            }
        ])
        .then(selected => {
            // goes into the database and tells it to add a role with values given
            // in the inquirer prompt above
            db.query('INSERT INTO roles(title, salary, departments_id) VALUES (?, ?, ?)', [selected.name, selected.salary, selected.deptId], (err, result) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`${selected.title} role added`);
                }
            });
        });
};

function addEmployee(){
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'first',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'last',
            },
            {
                type: 'input',
                message: 'What is the ID for the role this employee is associated with?',
                name: 'roleId',
                validate: function(value){
                    if (!isNaN(value) && value > 0){
                        return true;
                    }else{
                        return 'Please enter a number';
                    }
                }
            }
        ])
        .then(selected => {
            // goes into the database and tells it to add an employee with values given
            // in the inquirer prompt above
            db.query('INSERT INTO employees(first_name, last_name, roles_id) VALUES (?, ?, ?)', [selected.first, selected.last, selected.roletId], (err, result) =>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`${selected.first} ${selected.last} added as an employee`)
                }
            });
        });
};

async function employeeMap(){
    await new Promise((resolve, reject) =>{
        db.query('SELECT first_name, last_name FROM employee_db.employees', function(err, results){
            if(err){
                return reject(err);
            }
            employeesArray = results.map(function(row){
                return row.first_name + ' ' + row.last_name;
            });
            console.log('line 196: ', employeesArray);
            resolve('employeesArray updated');
        });

        rolesMap();
    });
}

async function rolesMap(){
    await new Promise((resolve, reject) =>{
        db.query('SELECT title FROM employee_db.roles', function(err, results){
            if(err){
                return reject(err);
            }
            rolesArray = results.map(function(row){
                return row.title;
            });
            console.log('line 212: ', rolesArray);
            resolve('rolesArray updated');
        });
    });

    console.log('end of roles map')
    updateInquirer();
};

function updateInquirer(){
    console.log('update inquirer');

    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which employee do you want to update?',
                choices: employeesArray,
                name: 'employee'
            },
            {
                type: 'list',
                message: "What is the employee's new role?",
                choices: rolesArray,
                name: 'role',
            }
        ])
        .then(selected => {
            console.log('then')
        })
};