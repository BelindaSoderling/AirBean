const User = require('../models/User');

const getUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const order = req.body.order;

  console.log(req.body)
  console.log(name);
  console.log(email);
  console.log(order)
  
  let user = await User.findOne({
    name,
    email
  });

  if (user == null) {
    const data = {
      name,
      email,
      orders: [
        order
      ]
    };
    const newUser = new User(data);

    newUser.save();
  }

  return res.json(user);
};

module.exports = getUser;