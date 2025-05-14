const router = require('express').Router();
const { 
    getHomePage, 
    getAboutPage, 
    getContactPage, 
    getTermsPage, 
    getPowerpointPage 
} = require('../controllers/pageController');

router.get('/', getHomePage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.get('/terms', getTermsPage);
router.get('/powerpoint', getPowerpointPage);

module.exports = router;
