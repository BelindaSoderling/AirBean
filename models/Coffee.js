const mongoose = require('mongoose');

const coffeeSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number
},  { collection : 'Coffee' });

module.exports = mongoose.model('Coffee', coffeeSchema);