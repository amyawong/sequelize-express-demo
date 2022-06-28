// 26. via tasks.js
// 26. Set up
const express = require('express');
const router = express.Router();

// To test out if it is hooked up right
router.get('/', (req, res) => {
    res.send('inside /API/owners')
})

module.exports = router;

// 27. Go to .routes/index.js