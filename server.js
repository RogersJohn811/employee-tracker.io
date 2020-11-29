const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
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