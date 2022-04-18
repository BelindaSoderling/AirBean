const mongoose = require('mongoose');

// Database URL
const url = 'mongodb://localhost:27017/AirBean';

const main = async () => {
  // Use connect method to connect to the database.
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Successful connection to database.');
  });
};

module.exports = main;