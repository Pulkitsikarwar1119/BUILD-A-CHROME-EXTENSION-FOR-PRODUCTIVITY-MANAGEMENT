const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  domain: String,
  start: Number,
  end: Number,
  duration: Number,  // in seconds or milliseconds
  userId: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
