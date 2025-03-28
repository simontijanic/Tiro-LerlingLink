const bcrypt = require('bcryptjs');
const Apprentice = require('../models/Apprentice');

exports.register = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            phone, 
            category, // Add this
            password, 
            confirmPassword 
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !category || !password || !confirmPassword) {
            req.flash('error', 'Alle påkrevde felt må fylles ut');
            return res.redirect('/auth/register');
        }

        // Validate password match
        if (password !== confirmPassword) {
            req.flash('error', 'Passordene matcher ikke');
            return res.redirect('/auth/register');
        }

        // Check if user already exists
        const existingUser = await Apprentice.findOne({ email });
        if (existingUser) {
            req.flash('error', 'En bruker med denne e-postadressen eksisterer allerede');
            return res.redirect('/auth/register');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new apprentice
        const apprentice = new Apprentice({
            firstName,
            lastName,
            email,
            phone,
            category, // Add this
            password: hashedPassword,
            isActive: true
        });

        await apprentice.save();

        req.flash('success', 'Registrering vellykket! Du kan nå logge inn.');
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Registration error:', error);
        req.flash('error', 'Det oppstod en feil under registreringen');
        res.redirect('/auth/register');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const apprentice = await Apprentice.findOne({ email });
        if (!apprentice) {
            req.flash('error', 'Ugyldig e-post eller passord');
            return res.redirect('/auth/login');
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, apprentice.password);
        if (!isMatch) {
            req.flash('error', 'Ugyldig e-post eller passord');
            return res.redirect('/auth/login');
        }

        // Create session
        req.session.userId = apprentice._id;
        req.session.userType = 'apprentice';
        
        req.flash('success', 'Du er nå logget inn');
        res.redirect(`/profile/${apprentice._id}`); // Redirect to their profile page
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'Det oppstod en feil under innlogging');
        res.redirect('/auth/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
};