// A model for the specific tasks

// 10. via db.js
// 10. Define the task by pulling in db and using db.define
const Sequelize = require('sequelize')
const db = require('./db') // since we are in db folder, we just need to grab db file

// 11. Make a new Task
    // inside db.define, we define what a task looks like and assign types to them
const Task = db.define('task', {
    name: {
        type: Sequelize.STRING, // since we are using Sequelize type, we need to import sequelize
        allowNull: false, // empty strings dont count towards allowNull, to specify we don't want empty strings, use notEmpty in a validate obj
        validate: {
            notEmpty: true // no empty strings
        }
    },
    complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false // provides an initial value of false unless specified
    },
    due: {
        type: Sequelize.DATE
    }
})

// 12. export so we can use it
module.exports = Task;

// 13. Set up same procedure in owner.js but with some tweaks