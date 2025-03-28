const isApprentice = (req, res, next) => {
    if (req.isAuthenticated() && req.user.constructor.modelName === 'Apprentice') {
        return next();
    }
    req.flash('error', 'Du må være logget inn som lærling for å få tilgang');
    res.redirect('/auth/login');
};

const isOrganization = (req, res, next) => {
    if (req.isAuthenticated() && req.user.constructor.modelName === 'Organization') {
        return next();
    }
    req.flash('error', 'Du må være logget inn som bedrift for å få tilgang');
    res.redirect('/organization/login');
};

module.exports = { isApprentice, isOrganization };