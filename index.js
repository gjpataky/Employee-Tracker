const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    multipleStatements: true,
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "s0ndevil",
    database: "employee_db"
});


connection.connect(function (err) {
    if (err) throw err;
    search();
});

function search() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View employee",
                "View Role",
                "Update employee role",
            ]
        })
        .then(function (answer) {
            if (answer.action === 'Add a department') {
                addDepartment();
            } else if (answer.action === 'Add a role') {
                addRole();
            } else if (answer.action === 'Add an employee') {
                addEmployee();
                if (answer.action === 'View all departments') {
                    viewDepartments();
                } else if (answer.action === 'View all roles') {
                    viewRoles();
                } else if (answer.action === 'View all employees') {
                    viewEmployees();
                } else if (answer.action === 'Update employee role') {
                    updateRole();
                }
            })
}
// Add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                department: "name",
                type: "input",
                message: "What is the department name?",
                choices: ["Account Management", "Loss Mitigation", "Compliance", "App Dev"],
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    dept_name: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("Department");
                    search();
                }
            );
        });
}
// Add a role
function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the the new role?",
                choices: ["Account Manager", "AVP", "Underwriter", "BAT Processor", "VP", "QA Specialist", "SQL Developer"],
            }
        ])
        .then(function (answer) {
            dept_id = null;

            if ((answer.dept = "Account Executive")) {
                dept_id = 1;
            }
            if ((answer.dept = "AVP")) {
                dept_id = 1;
                /*How do I get the AVP to associate with multiple departments?*/
            }
            if ((answer.dept = "Underwriting")) {
                dept_id = 2;
            }
            if ((answer.dept = "BAT Processor")) {
                dept_id = 2;
            }
            if ((answer.dept = "VP")) {
                dept_id = 2;
            }
            if ((answer.dept = "QA Specialist")) {
                dept_id = 3;
            }
            if ((answer.dept = "SQL Developer")) {
                dept_id = 4;
            }

            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    department_id: dept_id
                },
                function (err) {
                    if (err) throw err;
                    console.log("Added Role");
                    search();
                }
            );
        });
}
// Add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the last name?"
            }
        ])
    connection.query(
        "INSERT INTO employee SET ?",

        {
            first_name: answer.first_name,
            last_name: answer.last_name,
        },

        function (err) {
            if (err) throw err;
            console.log("Added employee");
            search();
        }
    );
};

// View adepartment
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`Department: ${res[i].dept_name}`);
        }
        search();
    });
}

// View a role
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`Role: ${res[i].title}  ||  Salary: $${res[i].salary}`);
        }
        search();
    });
}

// View a employee
function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`Name: ${res[i].first_name} ${res[i].last_name}`);
        }
        search();
    });
}

// Update employee roles