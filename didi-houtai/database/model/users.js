var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    phone: {
        type: String
    },
    pwd: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String,
        default: ''
    },
    idNum: {
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: 1
    },
    address: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 1
    },
    userType: {
        type: String,
        default: 1
    }
});
module.exports = mongoose.model('users', userSchema, 'users');