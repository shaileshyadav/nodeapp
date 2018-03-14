//users_controller.js

var crypto = require("crypto");
var user = require("../models/users_model.js");
var UserModel = new user();

exports.create = function(req, res) {

  if(req.method.toLowerCase() != "post") {
    res.render("signup.html", {layout: false});
  }
  else {
     new user(req.body).save();
     res.send("ok");
  }

}

exports.login = function(req, res) {

  if(req.method.toLowerCase() != "post") {
    res.render("login.html", {layout: false});
  }
  else {
    user.findOne({email: req.body.email}, function(err, result) {
       if(err) console.log(err);

         if(result == null) {
           res.send('invalid username',
		    {'Content-type' : 'text/plain'},
                    403);
         }
	 else {
           auth(result);
         }
    });

    function auth( userRes ) {
      if(!UserModel.encrypt(req.body.password) == userRes.password) {
         res.send('invalid password',
		  {'Content-type' : 'text/plain'},
                  403);
      } else {
         console.log(userRes._id);
         user.update({_id : userRes._id}, {'$set' : {token : Date.now}});
         res.send(userRes);
      }
    }
  }
}
