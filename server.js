const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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

