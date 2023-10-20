const mongoose = require('mongoose');

// Use the MONGODB_URI environment variable if available, otherwise fall back to the hardcoded connection string
const connectionString = process.env.MONGODB_URI || "mongodb+srv://minhmeoquay:SN1PqRsN7ZHCUBoy@cluster0.uzzmayw.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
