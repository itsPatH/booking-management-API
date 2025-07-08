let patients = []; // Datos en memoria

// Crear nuevo paciente
const createPatient = (req, res) => {
  const { name, birthdate, locationId } = req.body;

  if (!name || !birthdate || !locationId) {
    return res.status(400).json({ message: 'Faltan datos del paciente' });
  }

  const newPatient = {
    id: Date.now(), 
    name,
    birthdate,
    locationId,
  };

  patients.push(newPatient);
  res.status(201).json(newPatient);
};

// Actualizar paciente
const updatePatient = (req, res) => {
  const patientId = parseInt(req.params.id);
  const { name, birthdate, locationId } = req.body;

  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ message: 'Paciente no encontrado' });
  }

  if (name) patient.name = name;
  if (birthdate) patient.birthdate = birthdate;
  if (locationId) patient.locationId = locationId;

  res.json(patient);
};

// Eliminar paciente
const deletePatient = (req, res) => {
  const patientId = parseInt(req.params.id);
  const index = patients.findIndex(p => p.id === patientId);

  if (index === -1) {
    return res.status(404).json({ message: 'Paciente no encontrado' });
  }

  const deleted = patients.splice(index, 1);
  res.json({ message: 'Paciente eliminado', data: deleted[0] });
};

module.exports = {
  createPatient,
  updatePatient,
  deletePatient,
  patients, 
};
