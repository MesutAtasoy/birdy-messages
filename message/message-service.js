const express = require('express');
const Message = require('../message/message-schema');

const newMessage = async (req, res, next) => {
    try {
        var body = req.body;

        var messageConversation = await Message.findOne({
            $or: [
                { $and: [{ senderUserId: body.senderUserId }, { receiverUserId: body.receiverUserId }] },
                { $and: [{ receiverUserId: body.senderUserId }, { senderUserId: body.receiverUserId }] }
            ]
        });

        if (messageConversation === null) {
            let tempMessage = {
                senderUserId: body.senderUserId,
                receiverUserId: body.receiverUserId,
                conversations: [
                    {
                        senderUserId: body.senderUserId,
                        receiverUserId: body.receiverUserId,
                        message: body.message
                    }
                ]
            };

            let newMessage = await Message.create(tempMessage);

            if (newMessage) {
                return res.status(201).json({
                    'message': 'Message created successfully',
                    'data': newMessage
                });
            } else {
                throw new Error('something went worng');
            }
        } else {
            messageConversation.conversations.push({
                senderUserId: body.senderUserId,
                receiverUserId: body.receiverUserId,
                message: body.message
            });

            var savedMessages = await messageConversation.save();

            if (savedMessages) {
                return res.status(201).json({
                    'message': 'Message created successfully',
                    'data': savedMessages
                });
            } else {
                throw new Error('something went worng');
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
};

const getMessageByUserId = async(req, res, next) => {    

    var userId = req.params.id;

    var messageConversation = await Message.findOne({
        $or: [{ senderUserId:userId }, { receiverUserId: userId}]
    });
    
    return res.status(200).json({
        'data': messageConversation
    });
};



module.exports = {
    newMessage: newMessage,
    getMessageByUserId : getMessageByUserId
}