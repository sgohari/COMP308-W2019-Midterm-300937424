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


/* GET ==> display the login pag */
router.get('/login', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* GET ==> processing the login pag */
router.post('/login', (req, res, next) => {
  res.render('content/index', {
  
   });
});

/* GET ==> display the user Registration page */

/* GET ==> Processes the user Registration page */


//GET ==> perform user logout 

module.exports = router;
