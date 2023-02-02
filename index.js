const inquirer = require('inquirer');
const mysql = require('mysql2');

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
        .then(initialChoice =>{
            let selected = initialChoice.choices;

            if(selected === 'View All Departments'){
                viewDepartments();
            }
        })
};

function viewDepartments(){

}