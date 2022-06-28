// Model for owner of task

// 13. via task.js
const Sequelize = require("sequelize");
const db = require("./db");

const Owner = db.define("owner", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Owner;

// Models are set up similarly; use requires, db.define, and individual properties

// Next step: Make an association between two tables (ie a task belongs to an owner and an owner has many tasks)
    // if we include const Task = require('./task') in this file after const db = require('./db'),
    // problem is that task file will be required, then it will go into task and see that it requires owner, then back to task...
    // forms circular dependency
        // if two files are depending on each other, it doesn't know how to resolve that


// 14. Create index.js file (in db folder) which will grab everything in one place (NOTHING will grab index.js) and allow us to have access to all of our tables