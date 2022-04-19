const User = require('../models/User');

const saveOrder = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const order = req.body.order;
  
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
  } else {
    user.orders.push(order);
    await user.save();
  }

  return res.send();
};

module.exports = saveOrder;