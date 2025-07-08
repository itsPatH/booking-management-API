const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // Usuarios en memoria (por ahora)

const register = async (req, res) => {
  const { email, password } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), email, password: hashed };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('[Login request]', email, password); // Debug

  const user = users.find(u => u.email === email);
  if (!user) {
    console.log('❌ Usuario no encontrado');
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('❌ Contraseña incorrecta');
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  console.log('✅ Token generado:', token);

  res.json({ token });
};

module.exports = {
  register,
  login,
};
