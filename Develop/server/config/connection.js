const mongoose = require('mongoose');

const connectionString = "mongodb+srv://minhmeoquay:SN1PqRsN7ZHCUBoy@cluster0.uzzmayw.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
