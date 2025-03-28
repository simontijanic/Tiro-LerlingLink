const router = require('express').Router();
const { register, login, logout } = require('../controllers/userAuthController');
const { categories } = require('../utils/categories');

router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Logg inn'
  });
});

router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Registrer deg',
    categories
  });
});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);


module.exports = router;