var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    img: {
        type: String
    },
    updateTime:{
        type: String,
        default:''
    },
    createTime:{
        type: String,
        default:''
    }
},{versionKey: false});
module.exports = mongoose.model('images', userSchema, 'images');