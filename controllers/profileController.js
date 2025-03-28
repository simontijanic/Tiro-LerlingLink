const Apprentice = require('../models/Apprentice');

exports.getMyProfile = async (req, res) => {
    try {
        // User should be loaded by loadUser middleware
        const apprentice = await Apprentice.findById(req.session.userId)
            .select('-password');

        res.render('pages/myProfile', {
            title: 'Min Profil',
            profile: apprentice,
            categories: require('../utils/categories').categories
        });
    } catch (error) {
        console.error('Profile error:', error);
        req.flash('error', 'Det oppstod en feil ved lasting av profilen');
        res.redirect('/');
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { 
            firstName, lastName, phone, category,
            location, description, skills,
            education, experience, projects 
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
                school: education.school,
                program: education.program,
                graduationYear: education.graduationYear
            }
        };

        if (experience) {
            updateData.experience = Array.isArray(experience) ? experience : [experience];
        }

        if (projects) {
            updateData.projects = Array.isArray(projects) ? projects : [projects];
        }

        await Apprentice.findByIdAndUpdate(req.session.userId, updateData);

        req.flash('success', 'Profilen din har blitt oppdatert');
        res.redirect('/profile/me');
    } catch (error) {
        console.error('Update error:', error);
        req.flash('error', 'Det oppstod en feil ved oppdatering av profilen');
        res.redirect('/profile/me');
    }
};