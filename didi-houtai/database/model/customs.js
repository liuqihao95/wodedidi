var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    phone: {
        type: String,
        default:15690511739
    },
    name: {
        type: String
    },
    idNum: {
        type: String,
        default: '123456'
    },
    status: {
        type: String,
        default: 1
    },
    level: {
        type: String,
        default: 1
    },
    createTime:{
        type: String,
    }
});
module.exports = mongoose.model('customs', userSchema, 'customs');