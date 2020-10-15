const express = require('express');
let router = express.Router();

router.get('/',(req, res)=> {
    res.send('Birdy Messages app is still awake');
});

module.exports = router;