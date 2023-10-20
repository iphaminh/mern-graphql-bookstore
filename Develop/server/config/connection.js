const mongoose = require('mongoose');

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = mongoose.connection;