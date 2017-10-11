var express = require('express'); //API Express - also declared in package.json
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express(); //Shorthand to access express API.


mongoose.connect('mongodb://root:admin@ds117625.mlab.com:17625/amazon-replica', function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the databse!");
    }
})
//Middleware - a way of invoking express into Morgan library.
app.use(morgan('dev')); 

app.get('/testing', function(req, res){
    var name = "SUperr!";
    res.json("My Name is " + name);
}); 


app.get('/', function(req, res){
    var name = "Swarup";
    res.json("My Name is " + name);
}); //Server get this from URL or routes "/". res is server responding, and req is server requesting.

//app.post()//Posting data to the server

//app.put() //

//app.delete() //Delete the data

app.listen(3000, function(err){ //3000 is the server port!, and function is to check the runningness.
    if(err) throw err;
    console.log("Server Started...");
}); 