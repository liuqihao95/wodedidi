var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    contentText: {
        type: String
    },
    content: {
        type: String
    },
    img: {
        type: String
    },
    createTime: {
        type: String
    },
    updateTime: {
        type: String
    },
    author: {
        type: String
    },
    title: {
        type: String
    }
},{versionKey: false});
module.exports = mongoose.model('news', userSchema, 'news');