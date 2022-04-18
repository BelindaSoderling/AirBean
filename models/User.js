const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  orders : [{
    id: String,
    date: Date,
    total: Number
}]
},  { collection : 'Users' });

module.exports = mongoose.model('User', userSchema);