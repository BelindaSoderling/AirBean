const Coffee = require('../models/Coffee');

const getCoffee = async (req, res) => {
  const coffee = await Coffee.find({});
  res.json(coffee);
};

module.exports = getCoffee;