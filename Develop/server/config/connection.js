const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/googlebooksDB';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
