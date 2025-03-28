exports.getHomePage = (req, res) => {
    res.render('pages/index', {
        title: 'Hjem'
    });
};

exports.getAboutPage = (req, res) => {
    res.render('pages/about', {
        title: 'Om oss'
    });
};

exports.getContactPage = (req, res) => {
    res.render('pages/contact', {
        title: 'Kontakt oss'
    });
};

exports.getTermsPage = (req, res) => {
    res.render('pages/terms', {
        title: 'Brukervilkår'
    });
};