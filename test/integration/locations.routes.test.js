const request = require('supertest');
const app = require('../../src/app');
const { expect } = require('chai');

describe('Rutas de Locaciones (API)', () => {
  it('GET /api/locations/1/patients debería devolver pacientes del consultorio 1', async () => {
    const response = await request(app)
      .get('/api/locations/1/patients');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});
