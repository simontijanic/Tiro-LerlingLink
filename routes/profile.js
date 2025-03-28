const router = require('express').Router();
const { isOrganization } = require('../middleware/auth');
const { getProfile, updateProfile, contactApprentice } = require('../controllers/apprenticeController');

// Order matters - more specific routes first
router.get('/:id', getProfile);
router.post('/:id/update', updateProfile);
router.post('/:id/contact', isOrganization, contactApprentice);

module.exports = router;