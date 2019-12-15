const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');

inquirer
    .prompt([
        {
            type: 'list',
            name: 'function',
            message: 'What do you want to do?',
            choices: [
                'View All Employees',
                'View All Employees by Department',
                'View All Employees by Manager'
            ]
        },
    ])
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    });