const User = require('../models/User');

// Attendee submits a request to become an organizer
const requestOrganizer = async (req, res) => {
  try {
    const { orgName, phone } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'organizer') {
      return res.status(400).json({ message: 'You are already an organizer' });
    }
    if (user.organizerRequest?.status === 'pending') {
      return res.status(400).json({ message: 'You already have a pending request' });
    }

    user.organizerRequest = {
      status: 'pending',
      orgName,
      phone,
      requestedAt: new Date(),
    };
    await user.save();

    res.json({ message: 'Request submitted', status: 'pending' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin views all pending requests
const getPendingRequests = async (req, res) => {
  try {
    const users = await User.find({ 'organizerRequest.status': 'pending' })
      .select('name email organizerRequest');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin approves a request -> role actually changes to organizer
const approveRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'organizer';
    user.organizerRequest.status = 'approved';
    await user.save();

    res.json({ message: 'Request approved', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin rejects a request
const rejectRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.organizerRequest.status = 'rejected';
    await user.save();

    res.json({ message: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { requestOrganizer, getPendingRequests, approveRequest, rejectRequest };
