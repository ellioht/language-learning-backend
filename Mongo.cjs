const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
};

module.exports = connectToDatabase;
