const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const realestateSchema = new Schema({
  typeSale: {
    type: String,
    required: true,
    lowercase: true,
  },
  typeEstate: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: String,
    required: true,
    lowercase: true,
  },
  meters: {
    type: String,
    required: true,
    lowercase: true,
  },
  rooms: {
    type: String,
    required: true,
    lowercase: true,
  },
  year: {
    type: String,
    required: true,
    lowercase: true,
  },
  termostat: {
    type: Boolean,
    lowercase: true,
  },
  drain: {
    type: Boolean,
    lowercase: true,
  },
  pets: {
    type: Boolean,
    lowercase: true,
  },
  parking: {
    type: Boolean,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  productImage: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Realestate", realestateSchema);
