var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    content: {type: String, required: true},
    user:{type: Schema.Types.ObjectId, ref: 'User'}
});

MessageSchema.post('remove',function(message){
   User.findById(message.user, function (err, user) {
        user.messages.pull(message._id);
        user.save();
    }); 
})
module.exports = mongoose.model('Message',MessageSchema);