const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

module.exports = router;