const mongoose = require('mongoose');
const Plan = require('../models/Plan');
require('dotenv').config();

const samplePlans = [
  {
    name: 'Basic',
    price: 9.99,
    features: [
      '10 Projects',
      'Basic Support',
      '1GB Storage',
      'Email Reports'
    ],
    duration: 30
  },
  {
    name: 'Pro',
    price: 19.99,
    features: [
      '50 Projects',
      'Priority Support',
      '10GB Storage',
      'Advanced Analytics',
      'API Access'
    ],
    duration: 30
  },
  {
    name: 'Enterprise',
    price: 49.99,
    features: [
      'Unlimited Projects',
      '24/7 Support',
      '100GB Storage',
      'Custom Analytics',
      'Dedicated Account Manager',
      'SSO Integration'
    ],
    duration: 30
  },
  {
    name: 'Annual Basic',
    price: 99.99,
    features: [
      '10 Projects',
      'Basic Support',
      '1GB Storage',
      'Email Reports',
      '2 months free'
    ],
    duration: 365
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/subscription-dashboard');
    console.log('✅ Connected to MongoDB');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('✅ Cleared existing plans');

    // Insert sample plans
    await Plan.insertMany(samplePlans);
    console.log('✅ Sample plans inserted successfully');

    // Display inserted plans
    const plans = await Plan.find();
    console.log('\n📋 Inserted Plans:');
    plans.forEach(plan => {
      console.log(`- ${plan.name}: $${plan.price} (${plan.features.length} features)`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();