// filepath: seed.js
// Run with: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Apprentice = require('./models/Apprentice');
const Organization = require('./models/Organization');
const { categories } = require('./utils/categories');

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Delete all apprentices and organizations
  await Apprentice.deleteMany({});
  await Organization.deleteMany({});
  console.log('Deleted all apprentices and organizations');

  // Create dummy apprentices
  const apprentices = [
    {
      firstName: 'Ola',
      lastName: 'Nordmann',
      email: 'ola@example.com',
      password: '$2a$10$QWERTYUIOPLKJHGFDSAZXCVBNM1234567890qwertyuiop', // dummy hash
      phone: '12345678',
      category: categories[0],
      location: 'Oslo',
      description: 'Lærling i elektro',
      skills: ['Elektrisk arbeid', 'Teamarbeid'],
      isActive: true
    },
    {
      firstName: 'Kari',
      lastName: 'Nordmann',
      email: 'kari@example.com',
      password: '$2a$10$QWERTYUIOPLKJHGFDSAZXCVBNM1234567890qwertyuiop', // dummy hash
      phone: '87654321',
      category: categories[1],
      location: 'Bergen',
      description: 'Lærling i IKT',
      skills: ['IT-support', 'Koding'],
      isActive: true
    }
  ];

  // Create dummy organizations
  const organizations = [
    {
      orgName: 'Bygg AS',
      orgNumber: '123456789',
      email: 'bygg@example.com',
      password: '$2a$10$QWERTYUIOPLKJHGFDSAZXCVBNM1234567890qwertyuiop', // dummy hash
      contactPerson: { name: 'Per Bygg', phone: '11112222' },
      address: { street: 'Byggveien 1', city: 'Oslo', postalCode: '0123' },
      description: 'Byggfirma i Oslo',
      industry: 'Bygg og anlegg',
      isActive: true
    },
    {
      orgName: 'IT Konsult',
      orgNumber: '987654321',
      email: 'it@example.com',
      password: '$2a$10$QWERTYUIOPLKJHGFDSAZXCVBNM1234567890qwertyuiop', // dummy hash
      contactPerson: { name: 'Ida IT', phone: '33334444' },
      address: { street: 'IT-gata 2', city: 'Bergen', postalCode: '5000' },
      description: 'IT-selskap i Bergen',
      industry: 'IT og teknologi',
      isActive: true
    }
  ];

  await Apprentice.insertMany(apprentices);
  await Organization.insertMany(organizations);
  console.log('Seeded dummy apprentices and organizations');

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
