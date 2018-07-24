var express = require('express');
var router = express.Router();

// Sets the layout variables
router.use((req, res, next) => {
  res.locals.title = 'FootballAIr'
  res.locals.currentUserId = req.session.userId;

  next();
});

// Get Home Page
router.get('/', function(req, res, next) {
  res.render('index');
});

// Get Login Page
router.get('/login', (req, res) => {
  res.render('/login');
});

// Submit Login
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Username or password incorrect");
      next_error.status = 401;

      return res.redirect('/');
    }
  });
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {return next(err);}
    });
  }
  return res.redirect('/');
})

module.exports = router;
