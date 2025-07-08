const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { body, validationResult } = require('express-validator');

const validateAuth = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

router.post('/register', validateAuth, handleValidationErrors, register);
router.post('/login', validateAuth, handleValidationErrors, login);

module.exports = router;
