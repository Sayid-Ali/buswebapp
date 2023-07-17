const mongoose = require("mongoose");


const busSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    
  },
  engine: {
    type: String,
    
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  seatsBooked: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: "Yet To Start",
  },
  operator: {
    type: String,
    required: true,
  },

});
module.exports = mongoose.model("buses", busSchema);
