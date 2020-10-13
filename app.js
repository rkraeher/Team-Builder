const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee = [
  {
    type: "list",
    message:
      "Please select a role for the employee that you would like to add to your team.",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    message: "Enter the team member's name.",
    name: "name",
  },
  {
    type: "input",
    message: "Provide an ID number for the team member.",
    name: "id",
  },
  {
    type: "input",
    message: "Write the email address for the team member.",
    name: "email",
  },
];

const manager = [
  {
    type: "input",
    message: "Please provide the office number for the manager",
    name: "office",
  },
];

const engineer = [
  {
    type: "input",
    message: "Enter the engineer's GitHub username.",
    name: "github",
  },
];

const intern = [
  {
    type: "input",
    message: "Provide the school name for the intern.",
    name: "school",
  },
];

const team = [];

// I need a way to prompt the user if they want to add another team member and say when they are done.

function addNewMember() {
  inquirer.prompt(
      {
    type: "confirm",
    message: "Would you like to add a member to your team?",
    name: "add",
  }).then(function(response){
      if (response.add === true) {
          //Run the employee inquirer prompt
      } 
      // Run code to terminate the prompt process
  });

function memberData() {
    
}
  inquirer.prompt(employee).then(function (data) {
    switch (data.role) {
      case "Manager":
        inquirer.prompt(manager).then(function (member) {
          let managerMember = new Manager(
            data.name,
            data.id,
            data.email,
            member.office
          );
          team.push(managerMember);
          console.log(managerMember);
          console.log(team);
        });
        break;
      case "Engineer":
        inquirer.prompt(engineer).then(function (member) {
          let engineerMember = new Engineer(
            data.name,
            data.id,
            data.email,
            member.github
          );
          team.push(engineerMember);
          console.log(engineerMember);
          console.log(team);
        });
        break;
      case "Intern":
        inquirer.prompt(intern).then(function (member) {
          let internMember = new Intern(
            data.name,
            data.id,
            data.email,
            member.school
          );
          team.push(internMember);
          console.log(internMember);
          console.log(team);
        });
    }
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
