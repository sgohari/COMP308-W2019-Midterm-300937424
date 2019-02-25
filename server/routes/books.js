/*Author : Syed Nasir Gohary
Student ID: 300937424
Subject: Comp308-004
Date: February 23, 2019
Test type: Midterm
Page: Books router
 */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport= require('passport');
// define the book model
let book = require('../models/books');

function requiredAuth(req, res, next){
  //checking if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* GET books List page. READ */
router.get('/',requiredAuth,(req, res, next) => {
  // find all books in the books collection
  
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books,
        displayName: req.user ? req.user.displayName: ''

      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add',requiredAuth,(req, res, next) => {
  //for dynamic redirection to add view
     res.render('books/details', {
    title: 'Add New book',
    books: '',
    displayName: req.user ? req.user.displayName: ''

  });


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add',requiredAuth,(req, res, next) => {
    let newBook=book({
      "Title": req.body.title,
      //"Description":req.body.description,
      "Price":req.body.price,
      "Author":req.body.author,
      "Genre":req.body.genre
    });
    book.create(newBook,(err,book)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      else
        {
          //refresh the Favourite book list
          res.redirect('/books');
        }
    });


});

// GET the Book Details page in order to edit an existing Book
router.get('/:id',requiredAuth,(req, res, next) => {

    let id=req.params.id;
    book.findById(id,(err,bookObject)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
          //show the detail view for edit or delete
          res.render('books/details',{
            title:'Edit Detail book',
            books:bookObject,
            displayName: req.user ? req.user.displayName: ''

      });
      }
    });

  
});

// POST - process the information passed from the details form and update the document
router.post('/:id',requiredAuth,(req, res, next) => {

  //delcaring an id
    let id=req.params.id;

    //initiating a new object of the book model
    let newBooks = book({
      "_id": id,
      "Title": req.body.title,
     // "Description":req.body.description,
      "Price":req.body.price,
      "Author":req.body.author,
      "Genre":req.body.genre
    });
   //functions for updating book list
    book.update({_id:id}, newBooks, (err)=>{

        if(err){
            console.log(err);
            res.end(err);
        }else{
            //Refresh favourite books List
            res.redirect('/books');

        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', requiredAuth, (req, res, next) => {
  //declaring an id 
    let id=req.params.id;
    //deleting methods 
    book.remove({_id:id}, (err)=>{

        if(err){
            console.log(err);
            res.end(err);
        }else{
            //Refresh Favvourite List
            res.redirect('/books');
    
        }
    });
});



module.exports = router;
