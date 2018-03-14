//index.js
var express = require('express');
    //var app = module.exports = express.createServer();
var app =express();
//app.listen(3000);

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeAuth');

//configure app
//app.configure(function() {
  app.set('views', __dirname + '/views');
  //app.engine('html', engines.mustache);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('view_options', {layout : false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use("/assets", express.static(__dirname + '/assets'));
  app.use('/models', __dirname + '/models');
//});

//include the maps controller
var users = require('./controllers/users_controller.js');
//app.<REQUEST_METHOD>(<REQUEST_URI>, <CONTROLLER_METHOD>)
app.get('/users/create', users.create);
app.post('/users/create', users.create);
app.get('/users/login', users.login);
app.post('/users/login', users.login);

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
