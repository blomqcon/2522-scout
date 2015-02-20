var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    email: String,
    password: String
});

exports.userSchema = userSchema;