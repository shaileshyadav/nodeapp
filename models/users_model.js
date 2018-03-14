//user_model.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    crypto = require('crypto');
    //require('assert');

var algorithm = 'aes256';
var key = 'D#$DF#QD#@~!W@E@';
var pw = '';

//USER SCHEMA
var userSchema = new Schema({
			ObjectId: ObjectId,
                        date: {type: Date, default: Date.now},
                        firstname: {type: String},
                        lastname: {type: String},
			email: {type: String, unique: true},
                        password: String

});

//encrypt method
userSchema.methods.encrypt = function encrypt(str) {
  pw = str;
  var cipher = crypto.createCipher(algorithm, key);
  var encrypted = cipher.update(pw, 'utf8', 'hex') + cipher.final('hex');
  console.log("ENCRYPTED: " + encrypted);
  return encrypted;
}

//password setter
userSchema.path('password').set(function(v) {
  return this.encrypt(v);
});

module.exports = mongoose.model('User', userSchema);
