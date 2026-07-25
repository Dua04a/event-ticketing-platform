const express = require('express');
const router = express.Router();
const { bookTicket, getMyTickets, verifyTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.post('/book', protect, bookTicket);
router.get('/my-tickets', protect, getMyTickets);
router.post('/verify', protect, verifyTicket);

module.exports = router;
