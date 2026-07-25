const express = require('express');
const router = express.Router();
const {
  requestOrganizer,
  getPendingRequests,
  approveRequest,
  rejectRequest,
} = require('../controllers/organizerController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, requestOrganizer);
router.get('/', protect, isAdmin, getPendingRequests);
router.post('/:userId/approve', protect, isAdmin, approveRequest);
router.post('/:userId/reject', protect, isAdmin, rejectRequest);

module.exports = router;
