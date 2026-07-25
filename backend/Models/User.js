const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['attendee', 'organizer', 'admin'], default: 'attendee' },
  organizerRequest: {
    status: { type: String, enum: ['none', 'pending', 'approved', 'rejected'], default: 'none' },
    orgName: String,
    phone: String,
    requestedAt: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
