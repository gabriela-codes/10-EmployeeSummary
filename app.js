const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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
const members = [];
const memberIds = [];

function inquire() {
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "enter manager name",
            },
            {
                type: "input",
                name: "managerId",
                message: "enter manager id",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "enter manager email",
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "enter manager office number",
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            members.push(manager);
            memberIds.push(answers.managerId);
            createOtherMembers();
        });
    }

    function createOtherMembers() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberType",
                message: "Enter team member type",
                choices: [
                    "Engineer",
                    "Intern",
                    "Done"
                ]
            }
        ]).then(user => {
            switch (user.memberType) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    finalizeMembers();
            }
        });
    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "enter engineer name"
            },
            {
                type: "input",
                name: "engineerId",
                message: "enter engineer id"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "enter engineer email"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "enter engineer GitHub"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            members.push(engineer);
            memberIds.push(answers.engineerId);
            createOtherMembers();
        });
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "enter intern name"
            },
            {
                type: "input",
                name: "internId",
                message: "enter intern id"
            },
            {
                type: "input",
                name: "internEmail",
                message: "enter intern email"
            },
            {
                type: "input",
                name: "internSchool",
                message: "enter intern school"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            members.push(intern);
            memberIds.push(answers.internId);
            createOtherMembers();
        });
    }

    function finalizeMembers() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(members), "utf-8");
    }

    createManager();
}
inquire();
