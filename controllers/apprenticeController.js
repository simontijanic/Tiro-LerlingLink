const Apprentice = require('../models/Apprentice');
const { categories } = require('../utils/categories');

exports.getProfile = async (req, res) => {
    try {
        const apprentice = await Apprentice.findById(req.params.id)
            .select('-password');

        if (!apprentice) {
            req.flash('error', 'Profilen ble ikke funnet');
            return res.redirect('/search');
        }

        // Check if this is the profile owner
        const isOwnProfile = req.user && 
                           req.user.constructor.modelName === 'Apprentice' && 
                           req.user._id.toString() === apprentice._id.toString();

        res.render('pages/profile', {
            title: `Profil - ${apprentice.firstName} ${apprentice.lastName}`,
            profile: apprentice,
            isOwnProfile,
            categories: require('../utils/categories').categories,
            user: req.user
        });
    } catch (error) {
        console.error('Profile error:', error);
        req.flash('error', 'Det oppstod en feil ved lasting av profilen');
        res.redirect('/search');
    }
};

exports.contactApprentice = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        
        const apprentice = await Apprentice.findById(id);
        if (!apprentice) {
            req.flash('error', 'Lærlingen ble ikke funnet');
            return res.redirect('/search');
        }

        // TODO: Add email sending logic here
        
        req.flash('success', 'Din melding har blitt sendt!');
        res.redirect(`/profile/${id}`);
    } catch (error) {
        console.error('Contact error:', error);
        req.flash('error', 'Det oppstod en feil ved sending av meldingen');
        res.redirect(`/profile/${req.params.id}`);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const apprentice = await Apprentice.findById(req.params.id);
        
        // Check if user is authorized to update this profile
        if (!req.user || 
            req.user.constructor.modelName !== 'Apprentice' || 
            req.user._id.toString() !== apprentice._id.toString()) {
            req.flash('error', 'Du har ikke tilgang til å redigere denne profilen');
            return res.redirect(`/profile/${req.params.id}`);
        }

        const { 
            firstName, lastName, phone, category,
            location, description, skills,
            education, projects 
        } = req.body;

        const updateData = {
            firstName,
            lastName,
            phone,
            category,
            location,
            description,
            skills: skills ? skills.split(',').map(s => s.trim()) : [],
            education: {
                school: education?.school,
                program: education?.program,
                graduationYear: education?.graduationYear
            },
            projects: Array.isArray(projects) ? projects : [projects]
        };

        await Apprentice.findByIdAndUpdate(req.params.id, updateData);

        req.flash('success', 'Profilen din har blitt oppdatert');
        res.redirect(`/profile/${req.params.id}`);
    } catch (error) {
        console.error('Update error:', error);
        req.flash('error', 'Det oppstod en feil ved oppdatering av profilen');
        res.redirect(`/profile/${req.params.id}`);
    }
};