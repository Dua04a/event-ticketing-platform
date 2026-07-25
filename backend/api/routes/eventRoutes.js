const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEventById } = require('../controllers/eventController');
const { protect, isOrganizer } = require('../middleware/authMiddleware');

router.post('/', protect, isOrganizer, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);

module.exports = router;
