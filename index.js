const express = require('express');
const app = express();
const PORT = process.env.PORT || 1357;
const api = require('./routes/api');
const connection = require('./db/connection');

connection();

app.use(express.json());

// Frontend
app.use(express.static('public'));
app.use(express.static('public/landing'));

// Routes
app.use('/api', api);

// Listen
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}.`);
});