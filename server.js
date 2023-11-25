const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "management_db",
  },
  console.log(`Connected to the management_db database.`)
);

const questions = [
  {
    type: "list",
    name: "question",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

function init() {
  // Prompt questions
  inquirer.prompt(questions).then((res) => {
    // If user enters text longer than 3 characters, return error message.
    if (res.question === "View All Departments") {
      db.query(
        "SELECT name FROM department",
        function (err, results) {
          console.table(results);
        }
      );
    }
    else if (res.question === "View All Roles") {
      db.query(
        "SELECT title FROM roles",
        function (err, results) {
          console.table(results);
        }
      );
    }
    else if (res.question === "View All Employees") {
      db.query(
        "SELECT first_name, last_name FROM employee",
        function (err, results) {
          console.table(results);
        }
      );
    }
    else if (res.question === "Add Department") {
      inquirer.prompt([
        {
          type: "input",
          name: "addDepartment",
          message: "What is the name of the department being added?"
        },
      ])
      .then(answers => {
        db.query(
          "INSERT INTO department (name) VALUES (?)", [answers.addDepartment],
          function (err, results) {
            console.log(`Added department: ${answers.addDepartment}`);
            return inquirer.prompt(questions);
          }
        );
      });
      
    }
  });
}

// Function call to initialize app
init();
