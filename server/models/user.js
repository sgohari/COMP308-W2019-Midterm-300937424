// required modules for our User model
let mongoose = require('mongoose');
let passportLocalMongoose=require('passport-local-mongoose');

let userSchema= mongoose.Schema({
    username:{
        type: String,
        default: '',
        trim: true,
        require: 'username is required'
    }
});