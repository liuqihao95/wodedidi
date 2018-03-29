var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    pwd: {
        type: String
    }
},{versionKey: false});
module.exports = mongoose.model('guanliyuan', userSchema, 'guanliyuan');