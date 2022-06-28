// 25. via .routes/index.js
// 25a. Set up
const express = require('express');
const { nextTick } = require('process');
const router = express.Router();

// 29a. Require in model for Tasks
const { Tasks, Task } = require('../db');

// 25b. To test out if it is hooked up right:
// router.get('/', (req, res) => {
//     res.send('inside /API/tasks')
// })

// 29. via app.js
// 29. Determine types of routes for tasks
// 29b. To get all the Tasks: 
// router.get('/', async (req, res) => {
//     res.send(await Tasks.findAll())
// })

// 30. Go into app.js and establish connection with Sequelize (by making sure there is a .sync somewhere)

// 31. via app.js
// 31a. Change 29b into try catch that only sends back tasks that dont throw err, and if it does, throw it into error handler
router.get('/', async (req, res) => {
    try {
        let tasks = await Tasks.findAll();
        res.send(tasks)
    } catch(err) {
        next(err)
    }
})

// 31b. post route ex
router.post('/', async(req, res, next) => {
    try {
        // 31c. need some data from our client (postman/website form, etc) to complete this; 
        // in order to get this data, need to use a body parser (which is a middleware setup)

        // 32. Go to app.js - Middleware to set up body parser

        // 33. via app.js
        // 33. get json values onto req.body
        const { name, complete } = req.body // req.body is an obj with values on it; in a .post for a task, we only care about name and complete (but not due date since we havent used it)
        let addedTask = await Task.create(req.body)// after geting values from req.body, we can add it to the task in this way
        res.status(201).send(addedTask) // respond to user after creating task by sending a status
            // in Postman, have POST and localhost:300/api/tasks, then go into Body and pass in:
                // { name: 'New Special Task' }
                // and expect new completed Task should have this name and complete should be false bc it is default value and nothing passed in for complete

    } catch(err) {
        next(err)
    }
})

// 34. delete task with certain id
// delete routes will typically use primary key of what they want to delete
router.delete('/:id', async(req, res, next) => {
    try {
        const { id } = req.params; // req.params.id since /:id is being passed in
        // to delete in sequelize (other than using method straight away )
        let taskToDelete = await Task.findByPk(id); 
        if (taskToDelete) { // check if taskToDelete exists
            await taskToDelete.destroy();
        }
        // alternatively:
            // if (!taskToDelete) { // check if taskToDelete doesn't exists
            //     throw new Error('No tasks with that id,' id)
            // }
        res.sendStatus(200); 

    } catch(err) {
        next(err)
    }
})

// 35. Go to app.js for Error Handling and 404 Routes

module.exports = router;

// 26. Go to owners.js and set up



// req.body is only accessible in post and put route; CANNOT put a body on get or delete routes
// to delete in Sequelize, there is a .destroy method for an instance and a .remove method for a model