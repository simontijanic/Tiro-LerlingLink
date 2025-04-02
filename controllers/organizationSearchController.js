const Organization = require('../models/Organization');

exports.searchOrganizations = async (req, res) => {
    try {
        const { query, industry, location } = req.query;
        const page = parseInt(req.query.page) || 1;
        const ITEMS_PER_PAGE = 9;

        let searchQuery = { isActive: true };
        
        if (query) {
            searchQuery.$or = [
                { orgName: new RegExp(query, 'i') },
                { description: new RegExp(query, 'i') },
                { industry: new RegExp(query, 'i') }
            ];
        }
        
        if (industry) {
            searchQuery.industry = new RegExp(industry, 'i');
        }
        
        if (location) {
            searchQuery['address.city'] = new RegExp(location, 'i');
        }

        const totalItems = await Organization.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        const organizations = await Organization.find(searchQuery)
            .select('-password')
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE)
            .sort({ orgName: 1 });

        res.render('organization/search', {
            title: 'Finn bedrifter',
            query,
            industry,
            location,
            results: organizations,
            industries: [
                'Bygg og anlegg',
                'IT og teknologi',
                'Helse og omsorg', 
                'Restaurant og matfag',
                'Transport og logistikk',
                'Industri og produksjon',
                'Handel og service'
            ],
            pagination: {
                page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Organization search error:', error);
        req.flash('error', 'Det oppstod en feil under søket');
        res.redirect('/');
    }
};