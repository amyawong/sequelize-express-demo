// 4. via db.js
// purpose of seed file is to run to make sure db is connected properly, has the right tables, and have initial values put into it


// 5. Pull db from db folder
// const db = require('./db/db')

// 17a.
const { db, Task, Owner } = require('./db');


// 6. Make run function to run seed file
    // putting in try catch bc catch allows to console log error and finally block allows to make sure that db is closed down
async function run() {
    try {
        await db.sync({ force: true }) // common practice to include so that it overrides whatever is in table
            // seed file should only be run ONCE and clear out db and replace with new values
            // need to await bc it is db command
        console.log('Connect to Database') // to make sure things are running correctly

        // 17b. 
        await Task.create({ name: 'First task' })
        await Owner.create({ name: 'Xyz'})

        // 20. Method 1: if you know the ownerId as you're creating it, you can put straight into create directly
        await Task.create({name: 'Second Task', ownerId: 1})

        // 20. Method 2: if you don't know ownerId and have to get them later, find the owner and task, then run magic methods
        // let xyz = await Owner.findAll({ where: {name: 'Xyz'}}); // console.log(xyz);
        let xyz = await Owner.findByPk(1);
        let task = await Task.findByPk(1);

        // Method 2 continued - either one of following (either have owner add task or task set its owner):
        await xyz.addTask(task);
        await task.setOwner(xyz);

    } catch (err) {
        console.error(err);
            // val of err comes from if any of generated requests from try() generate a thrown error, catch is resp for catching the err
            // catch waits for an error to happen and handles it in the defined way

    } finally {
        // we dont have to always use finally, only use when you want something else to happen
        await db.close(); // makes sure we will always exit safely out of db no matter if we go through try or catch; programatically closing the connection
        console.log('Closed Database')
    }
}

// 7. Go into package.json and under scripts, add in:
    // "seed": "node seed.js"

// 8. Add console.log statemnts in try and finally to make sure things are running properly, then invoke run() to test
// Do so by going into Terminal and running: npm run seed   OR      node seed.js
run();
    // if you see this:
    // Executing (default): SELECT 1+1 AS result
    // Connect to Database
    // Closed Database
    // in Terminal, it means db connection has successfully been established


// 9. In db.js, start making tables for database



// 17. via index.js
// 17a. we could individually require Task and Owner, but index.js makes it so that we can pull them all with one require
    // const db = require('./db/db') from line 6 gets changed to const { db, Task, Owner } = require('./db')
    // since require looks for index.js file on its own, we can leave input as ./db
    // since { db, Task, Owner } was exported as an object in index.js, the object is getting destructured to get values back
// 17b. so we wanted to, we could go into try and add task by writing
     // await Task.create({ name: 'First task'})
        // due and complete can be omitted because we allow null
    // we could also add owner by writing
        // await Owner.create({ name: 'Xyz'})


// 18. To view effect of 17b, save changes and in Terminal, run:
    // npm run seed


// 19. Open up Postico; expected to see owners and tasks tables
    // In owners table, there should be one owner with a name and an id of 1
    // In tasks table, there should be id = 1, task = 'First task', complete = FALSE, due = NULL, ownerid = NULL
        // since value for complete wasn't assigned, by default it went to false
        // due defaulted to null since nothing was passed in
        // ownerid is null bc there was an association made (task belongs to an owner as seen in index.js), sequelize automatically adds an ownerid to the task asking which owner task is being connected to
            // owners have not been linked to tasks yet


// 20. Make an association by assigning an owner to a task
    // Method 1: when creating a value, you can directly assign it the property; i.e.
    // await Task.create({name: 'Second Task', ownerId: 1}) // to do this, ownerId HAS to exist, if not, an error will be created
        // to view, save file, then run npm run seed in Terminal
    // Method 2: get variable with instance of task and owner, and use the 'magic' association methods to put them together, ie
    // for owner: 
        // let xyz = await Owner.findAll({ where: {name: 'Xyz'}});
        // console.log(xyz);
            // diff methods: findAll/findOne/findByPk
            // console.log allows us to see results in terminal when we run npm run seed
    // for task:
        // let task = await Task.findByPk(1);
    // then either:
        // await xyz.addTask(task);
            // have to await them since they are db operations
    // or:
        // await task.setOwner(cherry);


// 21. (not a step but a rule of thumb)
// instead of creating task multiple times and having multiple lines of await Task.create({name: '___'}), seed file can be broken down into functions (right after require), eg:
    // async function addTasks() {
    //     for (let i = 0; i < 20; i++) {
    //         let newTask = {};
    //         newTask.name = `Task #${i}`;
    //         newTask.complete = Math.random(1) > 0.5 ? true: false // randomly decide if it is complete or not
    //         newTask.date = new Date() + (Math.random() * 500) // new Date() is current date and then random amount of time is added
    //         newTask.ownerId = Math.floor(Math.random() * owners.length + 1); // random ownerId based off owner array length
    //         await Task.create(newTask) // randomly generate a bunch of tasks entries in data
    //     }
    // }

    // let owners = [ { name: 'a' }, { name: 'b' }, { name: 'c' } ]; // mass generate owners
    // async function addOwners() {
    //     owners.forEach(async person => await Owner.create(person));
    //         // for each person on the owners list, create the person
    // }

    // then go in .try in run function and put:
    // await addTasks();
    // await addOwners();


// 22. Transition from Sequelize to Express: go to app.js


// ------------------------------------------------------------------------------------------------------------------------------------------------
// Sidenotes:
    // - 'Magic' methods: In One-To-Many, you have many associations and can ADD more; when you have one association you can SET it
    // - Primary key: id is a unique identifier that helps you distinguish rows from each other tells you exactly what you're looking at
        // - setting something as a primary key makes it unique and says 'this is what i'm using to identify distinct rows'
    // - Foreign key: is a link to a primary key of another table

        