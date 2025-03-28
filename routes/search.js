const router = require('express').Router();
const { searchApprentices } = require('../controllers/searchController');

router.get('/', searchApprentices);

module.exports = router;