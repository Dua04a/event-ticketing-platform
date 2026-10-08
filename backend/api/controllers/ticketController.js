const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const QRCode = require('qrcode');
const crypto = require('crypto');

const createRainbowQrCode = (value) => {
  const { modules } = QRCode.create(value);
  const quietZone = 4;
  const size = modules.size + quietZone * 2;
  const paths = [];

  for (let y = 0; y < modules.size; y += 1) {
    for (let x = 0; x < modules.size; x += 1) {
      if (modules.data[y * modules.size + x]) {
        paths.push(`M${x + quietZone} ${y + quietZone}h1v1h-1z`);
      }
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#fff"/><path fill="#b32683" shape-rendering="crispEdges" d="${paths.join('')}"/></svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

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
    const qrCodeImage = createRainbowQrCode(uniqueCode);

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
