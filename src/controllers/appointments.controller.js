let appointments = []; // Array temporal en memoria

// Crear una nueva cita
const createAppointment = (req, res) => {
  const { patientId, locationId, date, time } = req.body;

  if (!patientId || !locationId || !date || !time) {
    return res.status(400).json({ message: 'Faltan datos para agendar la cita' });
  }

  const newAppointment = {
    id: Date.now(), // ID temporal
    patientId,
    locationId,
    date, // formato sugerido: "2025-07-08"
    time, // formato sugerido: "10:30"
  };

  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
};

// Ver todas las citas
const getAllAppointments = (req, res) => {
  res.json(appointments);
};

// Ver citas por paciente
const getAppointmentsByPatient = (req, res) => {
  const patientId = parseInt(req.params.patientId);
  const result = appointments.filter(a => a.patientId === patientId);

  res.json(result);
};

// Ver citas por locación
const getAppointmentsByLocation = (req, res) => {
  const locationId = parseInt(req.params.locationId);
  const result = appointments.filter(a => a.locationId === locationId);

  res.json(result);
};

// Cancelar (eliminar) cita
const deleteAppointment = (req, res) => {
  const appointmentId = parseInt(req.params.id);
  const index = appointments.findIndex(a => a.id === appointmentId);

  if (index === -1) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }

  const deleted = appointments.splice(index, 1);
  res.json({ message: 'Cita cancelada', data: deleted[0] });
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentsByPatient,
  getAppointmentsByLocation,
  deleteAppointment,
};