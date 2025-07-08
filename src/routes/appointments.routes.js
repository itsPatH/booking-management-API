const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

const {
  createAppointment,
  getAllAppointments,
  getAppointmentsByPatient,
  getAppointmentsByLocation,
  deleteAppointment,
} = require('../controllers/appointments.controller');

// Validaciones para crear una cita
const validateAppointment = [
  body('patientId')
    .isInt().withMessage('El ID del paciente debe ser un número'),
  body('locationId')
    .isInt().withMessage('El ID de la locación debe ser un número'),
  body('date')
    .isISO8601().withMessage('La fecha debe tener formato YYYY-MM-DD'),
  body('time')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora inválida (formato HH:mm)'),
];

// Validaciones para IDs por parámetro
const validateParamId = [
  param('id').isInt().withMessage('El ID debe ser numérico'),
];

// Validación de parámetro tipo número para filtros
const validateParamPatientId = [
  param('patientId').isInt().withMessage('El ID del paciente debe ser un número'),
];

const validateParamLocationId = [
  param('locationId').isInt().withMessage('El ID de la locación debe ser un número'),
];

// Middleware para capturar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Rutas
router.post('/', validateAppointment, handleValidationErrors, createAppointment);
router.get('/', getAllAppointments);
router.get('/patient/:patientId', validateParamPatientId, handleValidationErrors, getAppointmentsByPatient);
router.get('/location/:locationId', validateParamLocationId, handleValidationErrors, getAppointmentsByLocation);
router.delete('/:id', validateParamId, handleValidationErrors, deleteAppointment);

module.exports = router;