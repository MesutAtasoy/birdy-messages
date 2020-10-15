let mongoose = require('mongoose')
let Schema = mongoose.Schema;


var Conversation = new Schema({
    Id : {
       type : Schema.Types.ObjectId,
       auto : true
    },
    senderUserId : {
        type : Number,
        required : [true, "Sender User Id is required"]
    },
    receiverUserId : {
        type : Number,
        required : [true, "Receiver User Id is required"]
    },
    message : {
       type : String,
       required : [true, "Message is required"]
    },
    isRead : {
       type : Boolean,
       default : false
    }
});

var Message = new Schema(
    {
        conversationId : {
           type : Schema.Types.ObjectId,
           auto : true
        },
        senderUserId : {
            type : Number,
            required : [true, "Sender User Id is required"]
        },
        receiverUserId : {
            type : Number,
            required : [true, "Receiver User Id is required"]
        },
        conversations : [Conversation]
    }, {
        timestamps : true
    }
);

module.exports = mongoose.model('Message', Message);
