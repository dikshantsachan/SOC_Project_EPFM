const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');
const User = require('./models/user');
const Manager = require('./models/manager')
const bcrypt = require('bcrypt');

const commentRoutes= require('./api/routes/comments'); //chatbox routes imported

var saltRounds = 10;
PORT = 3001;


mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true});
let db = mongoose.connection;
/*
mongoose.connect('mongodb+srv://chatboxer:chatboxer@chatbox-qaytx.mongodb.net/test?retryWrites=true&w=majority',{   //to access mongoose cloud
useMongoClient:true

});
let db = mongoose.connection;
*/
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
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//bring in models
app.use(cors()) // Use this after the variable declaration


app.use('/chat',commentRoutes); //chatbox routes



app.post('/signup', (req,res) => {
    
    const user = new User();
    var response = {
        val: 'Anything'
    }
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.sex = req.body.sex;
    user.password = bcrypt.hashSync(req.body.password, 10);
    User.find({email:user.email},function(err,docs){
        console.log(docs.length)
        if(docs.length){
            response.val = "Invalid"
            res.send(response)
            console.log('Sign Up unsuccessful')
            }
        else {
            response.val = "Valid";
            res.send(response);
            //console.log(user);
            user.save(function(err){
            console.log(user);
            if(err){
            console.log(err);
            return;
        }
    });
    }
    })
    
})

app.post('/signupm', (req,res) => {
    var manager = new Manager();
    var response = {
        val: 'Anything'
    }
    manager.firstname = req.body.firstname;
    manager.lastname = req.body.lastname;
    manager.email = req.body.email;
    manager.password = bcrypt.hashSync(req.body.password, 10);
    Manager.find({email:manager.email},function(err,docs){
        if(docs.length){
            response.val = "Invalid"
            res.send(response)
            console.log('Sign Up unsuccessful')
            }
        else {
            response.val = "Valid";
            res.send(response);
            console.log(manager);
            manager.save(function(err){
            console.log(manager)
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
            res.send();
           }}
        else{
            console.log('Retry')
            res.send();
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
    User.find({manager_id:id},function(err,docs){
        //console.log(docs);
        var array = [];
        docs.find((element) => {
            if(element.email !== luser.email)
            {array.push(element)}
        })
        //console.log(array);
        //console.log(luser)
        res.send(array);
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
        id = email;
        //console.log(luser.password);
        if(bcrypt.compareSync(password, luser.password)) {
            console.log('Successfully Signed In');
            res.send(luser);
           } else {
            console.log('Retry')
            res.send();
           }}
        else{
            console.log('Retry')
            res.send();
        }
    })
    
})

app.post('/loginm', (req,res) => {
    res.send(luser);
})

app.post('/team', (req,res) => {
    User.find({manager_id:req.body.email},function(err,docs){
        res.send(docs);
        //console.log(docs);

    }
    )})
//Adding employees to team
app.post('/addtoteam',(req,res) => {
    var auth = {
        valid:false
    }
    console.log(req.body.email)
    User.find({email:req.body.email},function(err,docs){
        
        if(docs.length){
        if(docs[0].manager_id)
        {
            console.log('0')
            res.send(auth)
            
        }
        else{
            User.updateOne({email:req.body.email},{$set:{ manager_id:req.body.memail }},{new:true},function(err,docs){
                if(err){
                    console.log(err)
                }
                console.log("Successful")
                console.log(docs.nModified)
                auth.valid = true;
                res.send(auth)
                console.log(auth.valid)
            }
        )    
        }
    }
    else{
        res.send(auth)
    }
    })
    })
//Removing employees from team
app.post('/removefromteam',(req,res) => {
    User.find({email:req.body.email},function(err,docs){
        if(docs[0].manager_id == req.body.memail && docs.length)
        {
            User.updateOne({email:req.body.email},{$set:{ manager_id: null }},{new:true},function(err,docs){
                if(err){
                    console.log(err)
                }
                console.log("Successful")
                console.log(docs.nModified)
            }
        )
        }
    })
})

//Assigning Tasks

app.post('/assigntask',(req,res) => {
    var email = req.body[0].email;
    var task = req.body[1];
    User.findOneAndUpdate({email:email},{$push : {tasksPending: task}},function(err,doc){
        //console.log(doc);
        if(err)
            console.log(err)
    })
    console.log(email, task);
})
//Remove Task

app.post('/removetask',(req,res) => {
    //console.log(req.body)
    var email = luser.email
    req.body.dateCompleted = Date(Date.now());
    User.findOneAndUpdate({email:email},{$push : {tasksCompleted: req.body}},{new:true},function(err,doc){
        luser = doc;
        //console.log(luser);
        if(err)
            console.log(err)
    })
    User.findOneAndUpdate({ email: email }, { $pull: { tasksPending: req.body } }, { new: true }, function (err, doc) {
        luser = doc;
        if(err) console.log(err)

    }
    //console.log(obj)
    )
} )

//feedback handle
app.post('/feedback',(req,res) => {
    console.log(req.body)
    var email = req.body.email;
    var task1 = {
        TaskDescription: req.body.TaskDescription,
        Task: req.body.Task,
        date: req.body.date,
        dateCompleted: req.body.dateCompleted
    }
    var task2 = {
        TaskDescription: req.body.TaskDescription,
        Task: req.body.Task,
        date: req.body.date,
        efficiency: req.body.efficiency,
        speed: req.body.speed,
        development: req.body.development,
        accountability: req.body.accountability,
        feedback: req.body.feedback,
        dateCompleted: req.body.dateCompleted
    }
    //console.log(task1)
    User.findOneAndUpdate({ email: email }, { $pull: { tasksCompleted: task1 } }, { new: true }, function (err, doc) {
        if(err) console.log(err)

    })
    User.findOneAndUpdate({ email: email }, { $push: { tasksCompleted: task2 } }, { new: true }, function (err, doc) {
        console.log(doc)
        if(err) console.log(err)

    })
})


//to get the info about manager name from manager id for the chatbox(Change1)
app.get('/managerdetails', (req,res) => {
    
    manager_id = id;
    //id = manager_id;
    //console.log(manager_id);
    if(id)
    {
    Manager.find({email:manager_id},function(err,docs){
        //console.log(docs[0]);
        res.send(docs[0]);
    })
    }

    else
    res.send();
})


app.listen(PORT,() => {
    console.log("Server is Running on "+ PORT);
})
