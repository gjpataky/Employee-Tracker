const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
const MySQL = require('./MySQL');
const sqlQuery = new MySQL();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's0ndevil',
    database: 'employee_db',
    multipleStatements: true
});

db.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the database');
});

function resetDB() {
    db.query(sqlQuery.dropEmployeeTable(), err => {
        if (err) throw err
    });

    db.query(sqlQuery.dropRoleTable(), err => {
        if (err) throw err
    });

    db.query(sqlQuery.dropDepartmentTable(), err => {
        if (err) throw err
    });

    db.query(sqlQuery.createDepartmentTable(), err => {
        if (err) throw err
    });

    db.query(sqlQuery.createRoleTable(), err => {
        if (err) throw err
    });

    db.query(sqlQuery.createEmployeeTable(), err => {
        if (err) throw err
    });
}

function initDB() {

    db.query("INSERT INTO department (name) VALUES (?);INSERT INTO department (name) VALUES (?);INSERT INTO department (name) VALUES (?);INSERT INTO department (name) VALUES (?)", ['Sales', 'Legal', 'Finance', 'Engineering'],
        err => {
            if (err) throw err;
        }
    );

    db.query("INSERT INTO role (title, salary, department_id) VALUES ('Account Manager', 80000, 1)", err => {
        if (err) throw err;
    });

    db.query("INSERT INTO role (title, salary, department_id) VALUES ('AVP Account Management', 100000, 1)", err => {
        if (err) throw err;
    });

    db.query("INSERT INTO role (title, salary, department_id) VALUES ('Loss Mit Processor', 60000, 2)", err => {
        if (err) throw err;
    });

    db.query("INSERT INTO role (title, salary, department_id) VALUES ('VP Operations', 90000, 2)", err => {
        if (err) throw err;
    });

    db.query("INSERT INTO role (title, salary, department_id) VALUES ('QA Specialist', 50000, 3)", err => {
        if (err) throw err;
    });

    db.query("INSERT INTO role (title, salary, department_id) VALUES ('SVP Compliance', 120000, 4)", err => {
        if (err) throw err;
    });

    db.query("INSERT INTO role (title, salary, department_id) VALUES ('Sr SQL Developer', 150000, 4)", err => {
        if (err) throw err;
    });
}

async function getEmployeeInfo() {
    const answer = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee\'s first name? '
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee\'s last name? '
            },

        ]);

    console.log(answer);

    init();
}

async function init() {
    // Reset and initialize the database
    resetDB();
    initDB();
    const answer = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: [
                    'View All Employees',
                    'View All Employees by Department',
                    'View All Employees by Manager',
                    'Add Employee',
                    'Remove Employee Role',
                    'Update Employee Manager'
                ]
            }
        ]);

    switch (answer.action.toLowerCase()) {
        case 'add employee':
            getEmployeeInfo();
            break;

        default:
            break;
    }
}

init();