const User = require('../models/User');

const getUser = async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const user = await User.findOne({
    name,
    email
  });
  res.json(user);
};

module.exports = getUser;