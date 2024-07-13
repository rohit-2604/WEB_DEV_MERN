const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    // Remove the photo field to exclude image uploading options
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
