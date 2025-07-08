const { patients } = require('./patients.controller');

// Obtener pacientes según consultorio
const getPatientsByLocation = (req, res) => {
  const locationId = parseInt(req.params.locationId);
  const filtered = patients.filter(p => p.locationId === locationId);

  res.json(filtered);
};

module.exports = {
  getPatientsByLocation,
};
