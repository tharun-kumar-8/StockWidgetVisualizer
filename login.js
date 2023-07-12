var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
mongoose.connect('mongodb+srv://mmaswin22:Karadi2263@cluster0.b0ufq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/login', function(req,res){
    var email =req.body.email;
    var passs = req.body.passs;
  
    var data = {
        "email":email,
        "password":passs,
    }

    var filter = {
        "password":{$exists:true, $size:0}
    }

    
    db.collection("details").find(data).toArray(function(err, result) {
    if (err) throw err;
    var ress = result;
    console.log("Res variable");
    console.log(ress);
    if(ress.length == 0)
    {
        return res.redirect("login_err.html");

    }
    if(ress.length>0)
    {
        return res.redirect("landing_logout.html");
    }
  });         
})
  
app.post('/sign_up', function(req,res){
    var email =req.body.email;
    var pass = req.body.pass;
  
    var data = {
        "email":email,
        "password":pass,
    }
    console.log("Values inserted are");
    console.log(data);
    db.collection("details").find(data).toArray(function(err, result) {
    if (err) throw err;
    var ress = result;
    if(ress.length>0)
    {
        return res.redirect("login.html");
    }
    
    db.collection('details').insertOne(data,function(err, collection){
            if (err) throw err;
            console.log("Credentials created Successfully");
                  
        });
    
    });
          
    return res.redirect('landing_logout.html');
})

app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('landingpage.html');
}).listen(3000)
  
  
console.log("server listening at port 3000");