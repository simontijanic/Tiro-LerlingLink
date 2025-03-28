const mongoose = require('mongoose');
const { categories } = require('../utils/categories');

const apprenticeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    category: { 
        type: String, 
        required: true,
        enum: {
            values: categories,
            message: 'Ugyldig fagområde valgt'
        }
    },
    location: String,
    description: String,
    skills: [String],
    education: {
        school: String,
        program: String,
        graduationYear: Number
    },
    projects: [{
        title: String,
        description: String,
        url: { type: String, validate: /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/ }
    }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Virtual for full name
apprenticeSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Apprentice', apprenticeSchema);