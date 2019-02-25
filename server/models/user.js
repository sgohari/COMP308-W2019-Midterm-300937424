/*Author : Syed Nasir Gohary
Student ID: 300937424
Subject: Comp308-004
Date: February 23, 2019
Test type: Midterm
Page: User.js
 */

// required modules for our User model
let mongoose = require('mongoose');
let passportLocalMongoose=require('passport-local-mongoose');
// create a model class
let userSchema= mongoose.Schema({
    username:{
        type: String,
        default: '',
        trim: true,
        require: 'username is required'
    },
    email:{
        type: String,
        default: '',
        trim: true,
        require:'email is required'
    },
    displayName:{
        type: String,
        default:'',
        trim: true,
        require: 'display Name is required'
    },
    created:{
        type: Date,
        default: Date.now
    },

    update:{
        type: Date,
        default: Date.now
    }
},
    {
        collection: "users"
    }

);

let options =({
    missingPassportError: "Wrong/Missing Password"
});

userSchema.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', userSchema);
