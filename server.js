var express = require('express'); //API Express - also declared in package.json
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express(); //Shorthand to access express API.
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var User = require('./models/user'); //User object

mongoose.connect('mongodb://root:admin@ds117625.mlab.com:17625/amazon-replica', function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the databse!");
    }
})
//Middleware - a way of invoking express into Morgan library.
app.use(morgan('dev')); 
app.use(bodyParser.json()); //Express can parse json data
app.use(bodyParser.urlencoded({extented: true})); //Express can parse the URL
app.engine('ejs', ejsMate); //Tells what king of engine we are using.
app.set('view engine', 'ejs'); //Sets the enginge to whatever we want.


//Middleware ENDS...

app.post('/signup', function(req, res, next){
    var user = new User();
     
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    
    user.save(function(err){
        if(err) return next(err);
        res.json("Success!");
    });
});


app.get('/', function(req, res){
    res.render('home');
})
//Server get this from URL or routes "/". res is server responding, and req is server requesting.

//app.post()//Posting data to the server

//app.put() //

//app.delete() //Delete the data

app.listen(3000, function(err){ //3000 is the server port!, and function is to check the runningness.
    if(err) throw err;
    console.log("Server Started...");
}); 