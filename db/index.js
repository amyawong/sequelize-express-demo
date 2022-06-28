// 14. via owner.js
// 14. Grab db and all models in folder and combine them

const db = require('./db');
const Task = require('./task');
const Owner = require('./owner');


// 15. Form associations
    // since index.js has access to all models, they can be used within the same file
Task.belongsTo(Owner);
Owner.hasMany(Task);


// 16. allows us to export them all in one spot; meaning that if anyone needs these values, index.js has all of them and makes it easier to grab
// in order to link dependencies, we have to have a place where they come together that doesnt make a circular dependency
module.exports = { db, Task, Owner }


// 17. head to seed.js