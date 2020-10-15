const express = require('express');
const messageService = require('../message/message-service');
let router = express.Router();

router.post('/newMessage', messageService.newMessage);
router.get('/getMessages/:id', messageService.getMessageByUserId);


module.exports = router;