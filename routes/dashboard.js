const express = require('express');
const auth = require('./helpers/auth');
var router = express.Router();

router.get('/', auth.requireLogin, (req, res, next) => {
  res.render('dashboard/index.hbs');
});

module.exports = router;
