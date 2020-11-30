const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    getUserInput();
});

console.log("Welcome to our Employee Tracker Database");

/*
    getUserInput() uses inquirer to determine if the user wants to simply
    view the database, add to the database, or delete from the database.
*/

function getUserInput() {
    inquirer.prompt(
        [
            {
                name: "startOptions",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Data",
                    "View Data",
                    "Update Data",
                    "Delete Data",
                    "Exit"
                ]
            }
        ]).then((answer) => {
            if (answer.startOptions === "View Data"){
                viewData();
            }
            else if (answer.startOptions === "Add Data") {
                addData();
            }
            else if (answer.startOptions === "Update Data") {
                updateData();
            }
            else if (answer.startOptions === "Delete Data") {
                deleteData();
            }
            else if (answer.startOptions === "Exit") {
                process.exit(1);
            }
        })
}
/*
    addData() asks the user what information they want to add to
    the database tables, including employees, roles and departments.
*/
function addData() {
    inquirer.prompt([
        {
            name: "add",
            type: "list",
            message: "What would you like to add?",
            choices: [
                "Add Employee",
                "Add Role",
                "Add Department",
                "Exit"
            ]
        }
    ]).then(function (answer) {
        if (answer.add === "Add Employee") {
            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "First Name"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Last Name"
                },
                {
                    name: "role_id",
                    type: "number",
                    message: "Role ID #: "
                }
            ]).then(function (answer) {
                con.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Added employee, ${answer.first_name} ${answer.last_name}");
                        getUserInput();
                    }
                )
            })
        } else if (answer.add === "Add Role") {
            inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter Title"
                },
                {
                    name: "salary",
                    type: "number",
                    message: "Enter Salary"
                },
                {
                    name: "department_id",
                    type: "number",
                    message: "Enter Department"
                },
            ]).then(function (answer){
                con.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department_id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Added role, ${answer.title} at salary ${answer.salary}");
                        getUserInput();
                    }
                )
            });
        }
        else if (answer.add === "Add Department") {
            inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter Department Name: "
                },
            ]).then(function (answer){
                con.query(
                    "INSERT INTO department SET ?",
                    {
                        name: answer.name,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Added department, ${answer.name}");
                        getUserInput();
                    }
                )
            });
        }
        else if (answer.add === "Exit"){
            getUserInput();
        }
    });
} 

/*
    updateData() asks the user what database information they want to
    alter, employee roles.
*/

function updateData(){
    inquirer.prompt([
        {
            name: "update",
            type: "list",
            message: "Select the data you want to UPDATE: ",
            choices: [
                "Update Employee Role"
            ]
        },
    ]).then(function(answer){
        if (answer.update === "Update Employee Role"){
            inquirer.prompt([
                {
                    name: "role_id",
                    type: "number",
                    message: "Enter the role id: "
                 },
                {
                   name: "id",
                   type: "number",
                   message: "Enter the employee id: "
                }
            ]).then(function(answer){
                con.query("UPDATE employee SET role_id = ? WHERE ?;", [
                    {
                        role_id: answer.role_id
                    },
                    {
                        id: answer.id
                    }
                ],
                function(error){
                    if (error) throw error;
                    console.log(`Updated employee with id ${answer.id} to role ${answer.role_id}`)
                    getUserInput();
                });
            });
        }
    });
}

/*
    deleteData() asks the user what database information they want
    to delete, employees, roles, departments.
*/
function deleteData(){
    inquirer.prompt([
        {
            name: "delete",
            type: "list",
            message: "Select the data to DELETE: ",
            choices: [
                "Delete Employee",
                "Delete Role",
                "Delete Department"
            ]
        }
    ]).then(function(answer){
        if (answer.delete === "Delete Employee"){
            inquirer.prompt([
                {
                    name: "id",
                    type: "number",
                    message: "Enter Employee ID #: "
                },
            ]).then(function(answer){
                con.query("DELETE FROM employee WHERE ? ",[
                    {id: answer.id}
                ], function(error){
                    if (error) throw error;
                    console.log(`Employee with id ${answer.id} deleted`);
                    getUserInput();
                }
                )
            });
        }