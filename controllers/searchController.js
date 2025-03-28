const Apprentice = require('../models/Apprentice');

const categories = [
    'Elektro',
    'IKT og medieproduksjon',
    'Bygg- og anleggsteknikk',
    'Restaurant- og matfag',
    'Helse- og oppvekstfag',
    'Transport og logistikk',
    'Teknologi- og industrifag'
];

exports.searchApprentices = async (req, res) => {
    try {
        const { query, category, location } = req.query;
        const page = parseInt(req.query.page) || 1;
        const ITEMS_PER_PAGE = 9;

        let searchQuery = { isActive: true };
        
        if (query) {
            searchQuery.$or = [
                { firstName: new RegExp(query, 'i') },
                { lastName: new RegExp(query, 'i') },
                { skills: new RegExp(query, 'i') },
                { description: new RegExp(query, 'i') }
            ];
        }
        
        if (category) {
            searchQuery.category = category;
        }
        
        if (location) {
            searchQuery.location = new RegExp(location, 'i');
        }

        const totalItems = await Apprentice.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        const apprentices = await Apprentice.find(searchQuery)
            .select('-password')
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE)
            .sort({ createdAt: -1 });

        res.render('pages/search', {
            title: 'Finn lærlinger',
            categories,
            query,
            category,
            location,
            results: apprentices,
            isOrganization: req.user?.constructor.modelName === 'Organization',
            pagination: {
                page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Search error:', error);
        req.flash('error', 'Det oppstod en feil under søket');
        res.redirect('/');
    }
};