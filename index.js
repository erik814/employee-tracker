const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
                console.log('------------');
                console.log('view departments selected');
                console.log('------------');
                viewDepartments();
            }else if(selected.initialChoice === 'View All Roles'){
                console.log('------------');
                console.log('view roles selected');
                console.log('------------');
                viewRoles();
            }else if(selected.initialChoice === 'View All Employees'){
                console.log('------------');
                console.log('view employees selected');
                console.log('------------');
                viewEmployees();
            }else if(selected.initialChoice === 'Add Department'){
                addDepartment();
            }else if(selected.initialChoice === 'Add Role'){
                addRole();
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
                }
                //console.logs the updated department list
                db.query('SELECT * FROM departments', function (err, results) {
                    console.table(results);
                });
            });
        });
};

function addRole(){
    inquirer
        .prompt(
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'name',
            },
            {
                type: 'number',
                message: "What is the role's salary?",
                name: 'salary',
            },
            {
                type: 'number',
                message: 'What is the ID for the department this role is associated with?',
                name: 'deptId'
            }
        )
        .then(selected => {
            // goes into the database and tells it to add a role with values given
            // in the inquirer prompt above
            db.query('INSERT INTO roles(title, salary, departments_id) VALUES (?, ?, ?)', [selected.name, selected.salary, selected.deptId], (err, result) =>{
                if(err){
                    console.log(err);
                }
                //console.logs the updated roles list
                db.query('SELECT * FROM roles', function (err, results) {
                    console.table(results);
                });
            });
        });
};