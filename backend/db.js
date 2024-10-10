const mongoose = require('mongoose');
require('dotenv').config();

// Accessing environment variables
console.log(process.env.MONGODB_URL)
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("mongoDb connected!"))
  .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
})

const realEstateSchema = new mongoose.Schema({
  propertyId: {
    type: String,   // Unique identifier for the property
    required: true,
    unique: true
  },
  title: {
    type: String,   // Title or short description of the property
    required: true
  },
  description: {
    type: String,   // Full description of the property
  },
  price: {
    type: Number,   // Price of the property
    required: true
  },
  location: {
    address: String,    // Full address of the property
    city: String,       // City where the property is located
    state: String,      // State where the property is located
    zipCode: String,    // Zip code for the property
  },
  propertyType: {
    type: String,   // e.g., Apartment, House, Commercial, etc.
    enum: ['Apartment', 'House', 'Commercial', 'Land', 'Villa', 'Cottage'],  // Possible property types
    required: true
  },
  area: {
    type: Number,   // Size of the property (e.g., in square feet)
  },
  numberOfBedrooms: {
    type: Number,   // Number of bedrooms
  },
  numberOfBathrooms: {
    type: Number,   // Number of bathrooms
  },
  images: [{
    type: String,   // URLs to property images
  }],
  listedDate: {
    type: Date,   // Date when the property was listed
    default: Date.now
  },
  realtor: {
    name: String,   // Name of the agent or realtor handling the property
    contactInfo: String  // Contact information of the realtor
  },
  status: {
    type: String,   // Status of the property, e.g., 'Available', 'Sold', etc.
    enum: ['Available', 'Sold', 'Pending'],
    default: 'Available'
  },
});

const User = mongoose.model('User', UserSchema);
const RealEstate = mongoose.model('RealEstate', realEstateSchema);

module.exports = {
  User,
  RealEstate
}
