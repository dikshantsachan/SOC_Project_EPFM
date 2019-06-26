const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
const User = require('./models/user');
PORT = 3001;

mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});
let db = mongoose.connection;

//check connection

db.once('open',function(){
    console.log('Connected to MongoDB')
})

//check for db errors
db.on('error',function(err){
    console.log(err);
})

//init app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//bring in models
app.use(cors()) // Use this after the variable declaration

const user = new User();

app.post('/signup',(req,res) => {
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(user);
    user.save(function(err){
        if(err){
            console.log(err);
            return;
        }
    });
})

app.post('/login',(req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email,password);
    User.find({email:email},function(err,docs){
        var luser = docs[0];
        //console.log(luser.password);
        if(luser.password == password){
            console.log('Successfully Logged In')
        }
        else{
            console.log('Retry');
        }
    })
    
})

app.listen(PORT,() => {
    console.log("Server is Running on "+ PORT);
})