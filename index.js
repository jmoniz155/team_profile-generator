const inquirer = require("inquirer");
const path = require("path")
const fs = require("fs")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
 
const OUT_DIR = path.resolve(__dirname, "dist")
const outputPath = path.join(OUT_DIR, "team.html");
 
const render = require("./lib/htmlRenderer");
 
const team = [];
 
buildTeam()
 
async function buildTeam() {
   console.log("Build your team!")
   // start with the manager
   team.push(await createManager())
   // THEN add additional employees
   do {
       var nextEmployee = await createNextEmployee();
       if (nextEmployee) {
           team.push(nextEmployee);
       }
   } while (nextEmployee)
   if (!fs.existsSync(OUT_DIR)) {
       fs.mkdir(OUT_DIR)
   }
   fs.writeFileSync(outputPath, render(team), "utf-8");
}
 
 
 
async function createManager() {
   let answers = await inquirer.prompt([
       {
           type: "input",
           name: "name",
           message: "What is the team manager's name?"
 
       },
       {
           type: "input",
           name: "id",
           message: "What is the manager's ID?"
       },
       {
           type: 'input',
           name: "email",
           message: "What is the manager's email?"
       },
       {
           type: "input",
           name: "officeNumber",
           message: "What is the manager's office number?"
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
           "I don't want to add any more team members."
       ]
   }])
   switch (answers.next) {
       case "Engineer": return createEngineer()
       case "Intern": return createIntern()
       default: return null
   }
}
 
async function createIntern(){
   let answers = await inquirer.prompt([
       {
           type: "input",
           name: "name",
           message: "What is your intern's name?"
       },
       {
           type: "input",
           name: "id",
           message: "What is your intern's id?"
       },
       {
           type: "input",
           name: "email",
           message: "What is your intern's email?"
       },
       {
           type: "input",
           name: "school",
           message: "What is your intern's school?"
       }
   ])
   return new Intern(answers.name, answers.id, answers.email, answers.school);
}
 
async function createEngineer(){
   let answers = await inquirer.prompt([
       {
           type: "input",
           name: "name",
           message: "What is your engineer's name?"
       },
       {
           type: "input",
           name: "id",
           message: "What is your engineer's id?"
       },
       {
           type: "input",
           name: "email",
           message: "What is your engineer's email?"
       },
       {
           type: "input",
           name: "github",
           message: "What is your github user name?"
       }
   ]);
   return new Engineer(answers.name, answers.id, answers.email, answers.github);
}
 



