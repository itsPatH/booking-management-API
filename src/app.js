require('dotenv').config();
const express = require('express');
const app = express();

const patientsRoutes = require('./routes/patients.routes');
const locationsRoutes = require('./routes/locations.routes');
const appointmentsRoutes = require('./routes/appointments.routes');

const authRoutes = require('./routes/auth.routes');
const { authenticate } = require('./middleware/auth.middleware');

app.use(express.json());

// Main routes
app.use('/api/patients', patientsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/appointments', appointmentsRoutes);

app.get('/', (req, res) => {
  res.send('API de Agendamiento de Citas');
});

const { validationResult } = require('express-validator');

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/patients', authenticate, patientsRoutes);
app.use('/api/appointments', authenticate, appointmentsRoutes);
app.use('/api/locations', authenticate, locationsRoutes);

// Middleware to handle validation errors
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
});

module.exports = app;

