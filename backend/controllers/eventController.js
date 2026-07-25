const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, description, category, location, date, ticketPrice, totalCapacity, imageUrl } = req.body;

    const event = await Event.create({
      organizerId: req.user.id,
      title,
      description,
      category,
      location,
      date,
      ticketPrice,
      totalCapacity,
      imageUrl,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEvent, getAllEvents, getEventById };
