const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const isOrganizer = (req, res, next) => {
  if (req.user?.role !== 'organizer') {
    return res.status(403).json({ message: 'Only organizers can perform this action' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can perform this action' });
  }
  next();
};

module.exports = { protect, isOrganizer, isAdmin };
