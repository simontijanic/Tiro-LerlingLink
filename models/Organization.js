const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    orgName: { type: String, required: true },
    orgNumber: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{9}$/.test(v); // Norwegian org numbers are 9 digits
            },
            message: 'Organisasjonsnummer må være 9 siffer'
        }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactPerson: {
        name: { type: String, required: true },
        phone: String,
        title: String
    },
    address: {
        street: String,
        city: String,
        postalCode: String
    },
    description: String,
    industry: String,
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organization', organizationSchema);