const router = require('express').Router();
const { register, login, logout } = require('../controllers/organizationAuthController');

router.get('/login', (req, res) => {
    res.render('organization/login', {
        title: 'Logg inn som bedrift'
    });
});

router.get('/register', (req, res) => {
    res.render('organization/register', {
        title: 'Registrer bedrift'
    });
});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;