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

function addNewMember() {
  inquirer
    .prompt({
      type: "confirm",
      message: "Would you like to add a member to your team?",
      name: "add",
    })
    .then(function (response) {
      if (response.add === true) {
        memberData();
      } else {
        console.log(`All team members have been added.`);
        const html = render(team);
        fs.writeFile(outputPath, html, function (err) {
          if (err) throw err;
        });
      }
    });
}

function memberData() {
  inquirer.prompt(employee).then(function (data) {
    let validEmail = validateEmail(data);
    // let validId = validateId(data);
    if (validEmail === true) {
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
            addNewMember();
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
            addNewMember();
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
            addNewMember();
          });
      }
    } else {
      console.log(`Please enter a valid email address.`);
      memberData();
    }
  });
}

function validateEmail(data) {
  if (/\S+@\S+\.\S+/.test(data.email)) {
    return true;
  }
  return false;
}

// function validateId(data) {
//   if ( /^[1-9]\d*$/.test(data.id)) {
//     return true;
//   }
//   return false; 
// }

// Call the function to begin gathering user input.
addNewMember();

// TODO: id number validation
