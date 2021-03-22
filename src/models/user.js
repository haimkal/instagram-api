
const mongoose = require ('mongoose');

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    bio: String,
    avatar: String,

    followers: [mongoose.ObjectId],
    
    createAt: {
        type: Date,
        default: ()=> new Date()
    }
});

module.exports = User;