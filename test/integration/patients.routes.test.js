const request = require('supertest');
const app = require('../../src/app');
const { expect } = require('chai');

describe('Rutas de Pacientes (API)', () => {
  it('POST /api/patients debería crear un paciente', async () => {
    const response = await request(app)
      .post('/api/patients')
      .send({
        name: 'Ana García',
        birthdate: '2017-09-01',
        locationId: 1,
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.name).to.equal('Ana García');
  });

  it('POST /api/patients debería fallar si falta el nombre', async () => {
    const response = await request(app)
      .post('/api/patients')
      .send({
        birthdate: '2016-10-10',
        locationId: 1,
      });

    expect(response.status).to.equal(422);
    expect(response.body.errors).to.be.an('array');
  });
});
