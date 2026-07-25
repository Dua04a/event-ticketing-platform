const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  date: { type: Date, required: true },
  ticketPrice: { type: Number, required: true },
  totalCapacity: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  imageUrl: String,
  status: { type: String, enum: ['upcoming', 'past', 'cancelled'], default: 'upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);