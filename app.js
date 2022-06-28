'use strict';

const express = require('express');
const app = express();
// 28. via .routes/index.js
// 28a. Pulling api router from .routes/index.js
const apiRouter = require('./routes');

// 30. via tasks.js
// 30a. establish connection with Sequelize (by making sure there is a .sync somewhere)
const { db } = require('./db');

// example code:
// app.get('/users', (req, res) => {
//     // res.send([{name: 'fakeuser1'}]); // interprets what is being passed in (JSON, HTML/TEXT, etc.); when in doubt, use .send
//     res.json([{name: 'fakeuser1'}]); // adds headers to the request saying we will use JSON; case specific to JSON
//             // header is what is on HTTP request; go on devtools and under Network and next to name, you can find Headers which include things like URL, req method, status code, etc
//         // working back to front: sending mock data to pretend to get real data in order to make route work
// })


// 22. via seed.js
// 22. Creating routes
    // when creating routes, we need to think about our:
// - Middleware
// 32. via tasks.js
// 32. Set up body parser
// body parser takes the Body (in postman/insomnia) that is being sent along with HTML and converting it from JSON or XML/HTML into req.body object (in task.js)
app.use(express.json()) // built-in body parser for JSON and get values onto req.body; will take any json we send it and convert it into proper JS objs
app.use(express.urlencoded({ extended: false })) // body parser for XML/HTML form data coming through as part of URL

// 33. Go to tasks.js

// - API routes 
    // allows access to db and get data returned back to user
    // 23. Start making API routes; go to .routes/index.js

    // 28b. 
    app.use('/api', apiRouter); // <-- this pulls in router and ties it back into our single server
        // to test this, you can use postman or insomnia
        // can also go to terminal and run: npm start , then open up localhost:3000/api/___

    // 28c. Go in scripts in package.json and add "start": "nodemon app.js"
        // if nodemon isn't installed, in Terminal, run: npm install nodemon

    // 29. Go into tasks.js to set up routes

// - VIEWS routes 
    // 'Front end' routes which send back html files and React code
    // not focused on in this demo

// - Error Handler and 404 handlers
    // go towards the bottom because they are the final thing that happens; 
    // if none of other routes get matched, 404 happens; if any route above throws an error, then error handler happens
    // 35. via tasks.js
    // 35. Set up error handling
    app.use((err, req, res, next) => {  // Error handling route use app.use but has four args; since it has 4 vals, it is able to figure it is an error handling route
        // when we call next and pass in anything, next will try to find nearest error handler (in terms of order going down)
        // can have more than one error hanlder, but have one to be major one; 
        // we tend to have one in app that comes after everything, so if any api routes throw err, this err handler would be responsible for figuring out and logging out error
            // in most cases, we begin by logging out what error is, and then inform user of what error occurred
            console.log(err); // for us to view error in detail

            // to make error handling more specific:
            let statusCode = err.status || 500;
                // if statusCode doesn't have a status, set it to 500, but if it does, use what is provided
            res.status(statusCode).send('An Error Occured on the Server', err.message) // for clients/users
    })

    // 36. 404
    // 404 means someone tried to access a URL path that didn't have a corresponding route
    app.use((req, res,next) => {
        res.status(404).send(`CANNOT ${req.method}${req.url}`)
    })

// 30b. Set up initialization function
async function init () {
    try {
        // start by opening db
        await db.sync() // not using force: true bc don't want to lose data 
        // after syncing up to db properly, that is when you want to use app.listen beacuse we want to start listening only after db is connected;
        // this prevents attempts to get users/owners/tasks before db is synced up; server wont even start until db is synced and ready to go
        app.listen(3000, () => console.log('Server has started on Port: 3000')); 
    } catch(err) {
        console.error(err);
    }
}
// 30c. invoke init() and open up localhost:3000/api/tasks in Postman/Insomnia to see results
init();

// 31. Go to tasks.js

// uncommented and moved into init func in 30b
// app.listen(3000, () => console.log('Server has started on Port: 3000')); 

// one server has one app and a bunch of different routes
// app.use is done in app.js so that it gets applied to every route, not justs tasks/owners
