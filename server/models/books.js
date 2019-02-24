/*Author : Syed Nasir Gohary
Student ID: 300937424
Subject: Comp308-004
Date: February 23, 2019
Test type: Midterm
Page: Books model
 */
let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);
