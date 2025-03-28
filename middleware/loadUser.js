const Apprentice = require('../models/Apprentice');
const Organization = require('../models/Organization');

const loadUser = async (req, res, next) => {
    try {
        if (req.session && req.session.userId && req.session.userType) {
            let user = null;
            
            if (req.session.userType === 'apprentice') {
                user = await Apprentice.findById(req.session.userId).select('-password');
            } else if (req.session.userType === 'organization') {
                user = await Organization.findById(req.session.userId).select('-password');
            }

            if (user) {
                req.user = user;
                res.locals.user = user; // This makes user available in all views
            } else {
                // Clear invalid session
                req.session.destroy();
            }
        }
        next();
    } catch (error) {
        console.error('Load user error:', error);
        next(error);
    }
};

module.exports = loadUser;