const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "dist")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const team = [];
buildTeam()
async function buildTeam() {
console.log("Please build your team")
// Always start by creating the manager
team.push(await createManager())
// Add additional team members until user is done
do {
  var nextEmployee = await createNextEmployee();
  if (nextEmployee) {
    team.push(nextEmployee);
  }
} while (nextEmployee)
// Create the output directory if the output path doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}
fs.writeFileSync(outputPath, render(team), "utf-8");
}
async function createManager() {
let answers = await inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your manager's name?",
    validate: validateNonemptyString
  },
  {
    type: "input",
    name: "id",
    message: "What is your manager's id?",
    validate: validateId
  },
  {
    type: "input",
    name: "email",
    message: "What is your manager's email?",
    validate: validateEmail
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your manager's office number?",
    validate: validateNormalizedPositiveInteger
  }
])
return new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
}
async function createNextEmployee() {
let answers = await inquirer.prompt([{
  type: "list",
  name: "next",
  message: "Which type of team member would you like to add?",
  choices: [
    "Engineer",
    "Intern",
    "I don't want to add any more team members"
  ]
}])
switch (answers.next) {
  case "Engineer": return createEngineer()
  case "Intern":   return createIntern()
  default:         return null
}
}
async function createEngineer() {
let answers = await inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your engineer's name?",
    validate: validateNonemptyString
  },
  {
    type: "input",
    name: "id",
    message: "What is your engineer's id?",
    validate: validateId
  },
  {
    type: "input",
    name: "email",
    message: "What is your engineer's email?",
    validate: validateEmail
  },
  {
    type: "input",
    name: "github",
    message: "What is your engineer's GitHub username?",
    validate: validateNonemptyString
  }
]);
return new Engineer(answers.name, answers.id, answers.email, answers.github);
}
async function createIntern() {
let answers = await inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your intern's name?",
    validate: validateNonemptyString
  },
  {
    type: "input",
    name: "id",
    message: "What is your intern's id?",
    validate: validateId
  },
  {
    type: "input",
    name: "email",
    message: "What is your intern's email?",
    validate: validateEmail
  },
  {
    type: "input",
    name: "school",
    message: "What is your intern's school?",
    validate: validateNonemptyString
  }
]);
return new Intern(answers.name, answers.id, answers.email, answers.school);
}
function validateNonemptyString(string) {
if (string === "") {
  return "Please enter at least one character.";
} else {
  return true;
}
}
function validateNormalizedPositiveInteger(string) {
if (!/^[1-9]\d*$/.test(string)) {
  return "Please enter a positive number greater than zero."
} else {
  return true;
}
}
function validateId(string) {
if (!/^[1-9]\d*$/.test(string)) {
  return "Please enter a positive number greater than zero."
} else if (team.find((employee) => string === employee.getId())) {
  return "This ID is already taken. Please enter a different number.";
} else {
  return true;
}
}
function validateEmail(string) {
if (!/\S+@\S+\.\S+/.test(string)) {
  return "Please enter a valid email address.";
} else {
  return true
}
}

