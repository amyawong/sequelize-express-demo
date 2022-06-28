// 2. via setup.txt
// 2. Set up Sequelize
const Sequelize = require('sequelize');

// const db = new Sequelize('postgres://localhost/todos'); 
    // make new connection with sequelize; string is connection string
    // todos is name of database
    // 'postgres://localhost/todos' does not make the database but tries to connect to it, need to run commands in order to connect
    // we always have to make our own database for local machine

const db = new Sequelize('postgres://localhost/todos', { logging: false }); 
    // if you don't want to see all logs from sequelize, add second conditon; helps keeps log concise and not as excessive

module.exports = db;
    // setting up export


// 3. In Terminal, create db by running:
    // createdb todos
        // do not have to be in psql shell
        // check in postico to double check db is created


// 4. Create seed.js file
    // purpose of file is to run to make sure db is connected properly, has the right tables, and have initial values put into it


// purpose of this file is to serve as a connecting file to Sequelize
// as soon as .sync (from seed.js) is used, you are connected to that db and can start executing commands


// 9. via seed.js
// 9. start making tables for database; one for tasks and one for person who owns the task, so we will need two models
    // dbs can be made after const db =... line, but there would be a lot of code if there were a lot of tables in same file;
    // to modularize code and make it easier to keep track, create a subfolder of models (if there are a lot of dbs) or make individual files
        // 9. create task.js and owner.js in db folder

        
// 10. Go to task.js for next steps

