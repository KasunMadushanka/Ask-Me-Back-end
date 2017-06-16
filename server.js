var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./database').db_connection;
var app = express();
var sql = require('mssql');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

//var routes = require('./routes')

// ...

//app.use('/', routes)

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/checkAuth',urlencodedParser,function(req,res){
  var token=req.body.tok;
  sql.connect(connection).then(function(){
    new.sql.Request().query("SELECT * FROM customer WHERE customer_id='"+token+"'").then(function(recordset){
      if(recordset.length>0){
        res.send(recordset);
      }else{
        res.send(['invalid']);
      }
    }).catch(function(error){

    });

  });

});

app.post('/login', urlencodedParser, function(req, res) {

    var email= req.body.email;
    var password= req.body.password;

    sql.connect(connection).then(function() {
        console.log('opening connection');
        new sql.Request().query("Select customer_id,first_name,last_name,email from customer where email='"+email+"' and password='"+password+"'").then(function(recordset) {

            if(recordset.length>0){
                res.send(recordset);

            }else{
                res.send(['invalid']);

            }
        }).catch(function(error) {

        });
    });

});

app.post('/signup', urlencodedParser, function(req, res) {

    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var email= req.body.email;
    var password= req.body.password;

    sql.connect(connection).then(function() {
        console.log('opening connection');
        new sql.Request().query("Insert into customer (first_name,last_name,email,password) values('"+first_name+"','"+last_name+"','"+email+"','"+password+"')").then(function(recordset) {

            res.send("success");

        }).catch(function(error) {

        });
    });


})



app.listen(process.env.PORT||80, function() {
    console.log('Example app listening on port 80!')
})
