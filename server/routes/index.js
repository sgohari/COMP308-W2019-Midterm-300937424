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
let passport=require('passport');

//reference to use model
let userModel = require('../models/user');
let User = userModel.User; // this is alias for user model

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

//checking if user is login
if (!req.user){
  res.render('auth/login', {
    title: "Login",
    messages: req.flash('loginMessage'),
    displayName: req.user ? req.user.displayName: ''
  });

}else{
  return res.redirect('/')
}
});


/* GET ==> processing the login pag */
router.post('/login', (req, res, next) => {

  passport.authenticate('local', 
  (err, user, info) => {
    // server error?
    if(err) {
      return next(err);
    }
    // is there a user login error?
    if(!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      // server error?
      if(err) {
        return next(err);
      }
      return res.redirect('/contact-list');
    });
  })(req, res, next);
  });

/* GET ==> display the user Registration page */
router.get('/register', (req, res, next) => {
  //checking 
  if (!req.user){
    res.render('auth/register', {
      title: "Register",
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    });
  
  }else{
    return res.redirect('/')
  }
  });
  

/* GET ==> Processes the user Registration page */
router.post('/register', (req, res, next) => {

  //created new user object

  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : ""
      });
    } else {
      // if no error exists, then registration is successful

      // redirect the user
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/books");
      });
    }
  });
 
  });
//GET ==> perform user logout 



module.exports = router;
