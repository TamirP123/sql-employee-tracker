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
        "SELECT name as department FROM department",
        function (err, results) {
          console.table(results);
          init();
        }
      );
    }

    else if (res.question === "View All Roles") {
      db.query(
        "SELECT title as role, salary, name as department FROM roles JOIN department ON roles.department_id = department.id;",
        function (err, results) {
          console.table(results);
          init();
        }
      );
    }

    else if (res.question === "View All Employees") {
      db.query(
        "SELECT * FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id;",
        function (err, results) {
          console.table(results);
          init();
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
            // console.log(results);
            init();
          }
        );
      });
      
      
    }

    else if (res.question === "Add Role") {
      db.promise().query("SELECT id as value,name as name FROM department")
      .then(([departmentList]) => {
        
      
      inquirer.prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role being added?"
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of this role?"
        },
        {
          // Change this to a list in future
          type: "list",
          name: "roleDepartment",
          message: "What is the department that this role is being added to?",
          choices: departmentList
        },
      ])
      .then(answers => {
        db.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [answers.roleName, answers.roleSalary, answers.roleDepartment],
          function (err, results) {
            console.log(`Added role: ${answers.roleName} with the salary of ${answers.roleSalary}`);
            init();
          }
        );
      });
    })
      
    }

    else if (res.question === "Add Employee") {
      db.promise().query("SELECT id as value,title as name FROM roles")
      // Change for manager_id
      .then(([roleList]) => {
        db.promise().query("SELECT id as value,first_name as name FROM employee")
      .then(([managerList]) => {

      inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the first name of this employee"
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the last name of this employee?"
        },
        {
          // Change this to a list in future
          type: "list",
          name: "role",
          message: "What is the role of this employee?",
          choices: roleList
        },
        {
          // Change this to a list in future
          type: "list",
          name: "manager",
          message: "Who is the manager of this employee?",
          choices: managerList
        },
      ])
      .then(answers => {
        db.query(
          "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answers.firstName, answers.lastName, answers.role, answers.manager],
          function (err, results) {
            console.log(`Added employee: ${answers.firstName} ${answers.lastName}`);
            init();
          }
        );
      });
    })
  }) 
    }
  });
}

// Function call to initialize app
init();
