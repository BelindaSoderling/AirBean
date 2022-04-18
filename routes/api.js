const express = require('express');
const router = express.Router();
const getCoffee = require('../middleware/getCoffee');
const getUser = require('../middleware/getUser');


router.get('/coffee', getCoffee);

router.get('/user', getUser);

module.exports = router;