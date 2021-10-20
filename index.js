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

