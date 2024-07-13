const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: String,
  role: String, 
  gender: String 
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
