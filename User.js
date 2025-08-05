const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  usage: Object,
});

module.exports = mongoose.model('User', userSchema);
