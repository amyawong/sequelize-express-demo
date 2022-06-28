// this is ./routes/index.js, which is not the same as the one in db
// purpose of this file is to be API router and have routers that are off of this one (combines routes)

'use strict';
const express = require('express');
const router = express.Router();
module.exports = router;

// 27. require in router to use it
    // routers can be required inline (i.e. router.use('/tasks', require('./tasks))), but this just makes it easier to read
const tasksRouter = require('./tasks');
    // laymans terms: since there is only one export from tasks.js, it can be called whatever you want when you import it into this file
    // not calling it router since we already have a variable named router in this file
const ownersRouter = require('./owners');

// 28. Go back to app.js


// 23. via app.js
// 23. Set up routes for api/tasks and api/owners, start by:
// 24. Create tasks.js and owners.js in ./routes
// 25. Go to tasks.js


// api/tasks
router.use('/tasks', tasksRouter)


// api/owners
router.use('/owners', ownersRouter)