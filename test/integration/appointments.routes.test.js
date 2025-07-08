const request = require('supertest');
const app = require('../../src/app');
const { expect } = require('chai');

describe('Rutas de Citas (API)', () => {
  const mockAppointment = {
    patientId: 1,
    locationId: 1,
    date: '2025-07-09',
    time: '09:30'
  };

  it('POST /api/appointments debería agendar una cita', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .send(mockAppointment);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.patientId).to.equal(mockAppointment.patientId);
  });

  it('GET /api/appointments debería devolver citas', async () => {
    const response = await request(app)
      .get('/api/appointments');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('GET /api/appointments/patient/1 debería devolver citas del paciente 1', async () => {
    const response = await request(app)
      .get('/api/appointments/patient/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('GET /api/appointments/location/1 debería devolver citas del consultorio 1', async () => {
    const response = await request(app)
      .get('/api/appointments/location/1');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});