/*Author : Syed Nasir Gohary
Student ID: 300937424
Subject: Comp308-004
Date: February 23, 2019
Test type: Midterm
Page: index router
 */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
