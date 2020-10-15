const express = require('express');
const v1ApiController = require('./v1');
const homeController =  require('../../home/home-controllers')
let router = express.Router();
router.use('/v1', v1ApiController);
router.use('/', homeController);
module.exports = router;