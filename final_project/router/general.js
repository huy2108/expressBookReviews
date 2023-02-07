const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
    if(!isValid(username)){
        users.push({"username": username,"password": password});
        res.send("Successfully register");
    }else{
        res.send("User already exist")
    }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) =>{
      resolve(JSON.stringify(books,null,4));
  })
  
  myPromise.then((data) => console.log(data))

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
  let isbn = req.params.isbn;
  let myPromise = new Promise((resolve,reject) =>{
    resolve(books[isbn]);
  });

  myPromise.then((data) => console.log(data))

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  let myPromise = new Promise((resolve,reject) => {
    for(isbn in books){
        if(books[isbn]['author'] === author){
            resolve(books[isbn])
        }
    }
  })
  
  myPromise.then((data) => console.log(data))

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  let myPromise = new Promise((resolve,reject) =>{
    for(isbn in books){
        if(books[isbn]['title'] === title){
            resolve(books[isbn]);
        }
    }
  })

  myPromise.then((data) => console.log(data))

  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn]['reviews']);
  return res.status(300).json({message: "Yet to be implemented"});
});



module.exports.general = public_users;
