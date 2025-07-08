const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const {
  createPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patients.controller');

const validatePatient = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('birthdate').isISO8601().withMessage('Fecha inválida'),
  body('locationId').isInt().withMessage('La locación debe ser un número'),
];

const validateId = [
  param('id').isInt().withMessage('ID inválido'),
];

// Middleware que captura errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Ruta GET para listar pacientes
router.get('/', (req, res) => {
  // Aquí deberías obtener pacientes desde la BD o un array
  res.json([{ id: 1, name: "Paciente de prueba" }]);
});

// Definición de las demás rutas fuera del get
router.post('/', validatePatient, handleValidationErrors, createPatient);
router.put('/:id', validateId.concat(validatePatient), handleValidationErrors, updatePatient);
router.delete('/:id', validateId, handleValidationErrors, deletePatient);

module.exports = router;
