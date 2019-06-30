const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
const User = require('./models/user');
const bcrypt = require('bcrypt');
var saltRounds = 10;
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


app.post('/signup', (req,res) => {
    
    var response = {
        val: 'Anything'
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 10);
    User.find({email:user.email},function(err,docs){
        if(docs.length>0){
            response.val = "Invalid"
            res.send(response)
            console.log('Sign Up unsuccessful')
            }
        else {
            response.val = "Valid";
            res.send(response);
            console.log(user);
            user.save(function(err){
            if(err){
            console.log(err);
            return;
        }
    });
    }
    })
    
})

app.post('/login',(req,res) => {
    var email = req.body.email;
    var password = req.body.password;
    //console.log(email,password);
    User.find({email:email},function(err,docs){
        var luser = docs[0];
        //console.log(luser.password);
        if(bcrypt.compareSync(password, luser.password)) {
            console.log('Successfully Signed In');
            res.send(luser);
           } else {
            console.log('Retry')
           }
    })
    
})

app.listen(PORT,() => {
    console.log("Server is Running on "+ PORT);
})
