const bcrypt = require('bcryptjs');
const Organization = require('../models/Organization');

exports.register = async (req, res) => {
    try {
        const { 
            orgName, 
            orgNumber, 
            email, 
            password, 
            confirmPassword,
            contactPerson,
            phone,
            address 
        } = req.body;

        // Validate password match
        if (password !== confirmPassword) {
            req.flash('error', 'Passordene matcher ikke');
            return res.redirect('/organization/register');
        }

        // Check if organization already exists
        const existingOrg = await Organization.findOne({ 
            $or: [{ email }, { orgNumber }] 
        });
        
        if (existingOrg) {
            req.flash('error', 'En bedrift med denne e-postadressen eller organisasjonsnummeret eksisterer allerede');
            return res.redirect('/organization/register');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new organization
        const organization = new Organization({
            orgName,
            orgNumber,
            email,
            password: hashedPassword,
            contactPerson: {
                name: contactPerson,
                phone
            },
            address: {
                street: address
            },
            isActive: true
        });

        await organization.save();

        req.flash('success', 'Registrering vellykket! Du kan nå logge inn.');
        res.redirect('/organization/login');
    } catch (error) {
        console.error('Registration error:', error);
        req.flash('error', 'Det oppstod en feil under registreringen');
        res.redirect('/organization/register');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find organization
        const organization = await Organization.findOne({ email });
        if (!organization) {
            req.flash('error', 'Ugyldig e-post eller passord');
            return res.redirect('/organization/login');
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, organization.password);
        if (!isMatch) {
            req.flash('error', 'Ugyldig e-post eller passord');
            return res.redirect('/organization/login');
        }

        // Create session
        req.session.userId = organization._id;
        req.session.userType = 'organization';
        
        req.flash('success', 'Du er nå logget inn');
        res.redirect('/search');
    } catch (error) {
        console.error('Login error:', error);
        req.flash('error', 'Det oppstod en feil under innlogging');
        res.redirect('/organization/login');
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