const User = require('../models/User');

const getUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const user = await User.findOne({
    name,
    email
  });
  res.json(user);
};

module.exports = getUser; 