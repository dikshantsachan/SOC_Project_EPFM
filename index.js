const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
const User = require('./models/user');
const Manager = require('./models/manager')
const bcrypt = require('bcrypt');
var saltRounds = 10;
PORT = 3001;
var manager = new Manager();
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

app.post('/signupm', (req,res) => {
    
    var response = {
        val: 'Anything'
    }
    manager.firstname = req.body.firstname;
    manager.lastname = req.body.lastname;
    manager.email = req.body.email;
    manager.password = bcrypt.hashSync(req.body.password, 10);
    Manager.find({email:manager.email},function(err,docs){
        if(docs.length>0){
            response.val = "Invalid"
            res.send(response)
            console.log('Sign Up unsuccessful')
            }
        else {
            response.val = "Valid";
            res.send(response);
            console.log(manager);
            manager.save(function(err){
            if(err){
            console.log(err);
            return;
        }
    });
    }
    })
    
})
var id;
var luser;

app.get('/login/:email/:password',(req,res) => {
    email = req.params.email;
    password = req.params.password;
    //console.log(email,password);
    User.find({email:email},function(err,docs){
        if(docs.length>0){
        luser = docs[0];
        id = docs[0].manager_id;
        //console.log(luser.password);
        if(bcrypt.compareSync(password, luser.password)) {
            console.log('Successfully Signed In');
            res.send(luser);
           } else {
            console.log('Retry')
           }}
        else{
            console.log('Retry')
        }
    })
    
})

app.post('/login', (req,res) => {
    res.send(luser);
})

app.post('/manager', (req,res) => {
    
    manager_id = req.body.manager_id;
    //id = manager_id;
    //console.log(manager_id);
    Manager.find({email:manager_id},function(err,docs){
        //console.log(docs[0]);
        res.send(docs[0]);
    })
})

app.get('/teammembers', (req,res) => {
    if(id){
    User.find({manager_id:id},{"firstname":1,"lastname":1,"_id":0},function(err,docs){
        console.log(docs);
        res.send(docs);
    })}
    else{
        res.send("Team does not exist");
    }
    
})

app.get('/loginm/:email/:password',(req,res) => {
    email = req.params.email;
    password = req.params.password;
    //console.log(email,password);
    Manager.find({email:email},function(err,docs){
        if(docs.length>0){
        luser = docs[0];
        //console.log(luser.password);
        if(bcrypt.compareSync(password, luser.password)) {
            console.log('Successfully Signed In');
            res.send(luser);
           } else {
            console.log('Retry')
           }}
        else{
            console.log('Retry')
        }
    })
    
})

app.post('/loginm', (req,res) => {
    res.send(luser);
})

app.listen(PORT,() => {
    console.log("Server is Running on "+ PORT);
})