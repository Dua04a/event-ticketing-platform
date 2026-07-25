require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

const organizerRoutes = require('./routes/organizerRoutes');
app.use('/api/organizer-requests', organizerRoutes);

app.get('/', (req, res) => {
  res.send('API is working ✅');
});

// Connect once; serverless platforms reuse this across warm invocations
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to database successfully 🎉'))
  .catch((err) => console.error('Connection failed:', err));

module.exports = app;
