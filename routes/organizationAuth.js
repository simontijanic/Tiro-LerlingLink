const router = require('express').Router();

router.get('/loginOrganization', (req, res) => {
  res.render('loginOrganization');
});

router.get('/createOrganization', (req, res) => {
  res.render('createOrganization');
});

module.exports = router;