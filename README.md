# employee-tracker

## About this application
Node.js command line app using MySQL, Inquirer, and Console.Table in order to view and work with an employee database.

## How to install this application
To install, simply clone the repository

`
git clone git@github.com:RogersJohn811/employee-tracker.io.git
`

Paste the employee_db.sql into MySQL workbench and run the queries. This will build your employee_db database.
See lines 5-11 from server.js, which is your database connector.

`
    let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db"});
`

## How to run this application
Ensure your database is setup either by using the included employee_db.sql file or making your own and changing the code referenced above.

Run `node server.js` to start the application
