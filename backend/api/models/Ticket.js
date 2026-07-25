const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qrCode: { type: String, required: true, unique: true },
  status: { type: String, enum: ['valid', 'used', 'cancelled'], default: 'valid' },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);