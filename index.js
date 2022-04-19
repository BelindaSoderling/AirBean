const express = require('express');
const app = express();
const PORT = process.env.PORT || 1357;
const api = require('./routes/api');
const connection = require('./db/connection');
const saveOrder = require('./middleware/saveOrder');

connection();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Frontend
app.use(express.static('public'));
app.use(express.static('public/landing'));

// Routes
app.use('/api', api);

// POST
app.post('/', saveOrder);

// Listen
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}.`);
});