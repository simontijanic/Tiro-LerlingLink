const router = require('express').Router();
const { 
    getHomePage, 
    getAboutPage, 
    getContactPage, 
    getTermsPage 
} = require('../controllers/pageController');

router.get('/', getHomePage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.get('/terms', getTermsPage);

module.exports = router;
