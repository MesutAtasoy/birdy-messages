const messageController = require('../../message/message-controllers');

const express = require('express');
let router = express.Router();
router.use('/messages', messageController);
module.exports = router;