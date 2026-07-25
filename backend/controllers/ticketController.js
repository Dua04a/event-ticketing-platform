const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const QRCode = require('qrcode');
const crypto = require('crypto');

// Book a ticket for an event
const bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Prevent overbooking
    if (event.ticketsSold >= event.totalCapacity) {
      return res.status(400).json({ message: 'Event is fully booked' });
    }

    // Generate a unique code for this ticket
    const uniqueCode = crypto.randomBytes(16).toString('hex');
    const qrCodeImage = await QRCode.toDataURL(uniqueCode);

    const ticket = await Ticket.create({
      eventId: event._id,
      userId: req.user.id,
      qrCode: uniqueCode,
    });

    // Increase the ticketsSold counter
    event.ticketsSold += 1;
    await event.save();

    res.status(201).json({
      ticket,
      qrCodeImage, // base64 image the frontend can display directly
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tickets belonging to the logged-in user
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).populate('eventId');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify/scan a ticket (organizer use)
const verifyTicket = async (req, res) => {
  try {
    const { qrCode } = req.body;

    const ticket = await Ticket.findOne({ qrCode });
    if (!ticket) {
      return res.status(404).json({ message: 'Invalid ticket' });
    }

    if (ticket.status === 'used') {
      return res.status(400).json({ message: 'Ticket already used' });
    }

    ticket.status = 'used';
    await ticket.save();

    res.json({ message: 'Ticket verified successfully', ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { bookTicket, getMyTickets, verifyTicket };
