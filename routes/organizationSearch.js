const router = require('express').Router();
const { searchOrganizations } = require('../controllers/organizationSearchController');

router.get('/', searchOrganizations);

module.exports = router;