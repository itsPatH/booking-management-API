const { expect } = require('chai');

describe('Paciente', () => {
  it('debe tener nombre y fecha de nacimiento válidos', () => {
    const paciente = {
      name: 'María Pérez',
      birthdate: '2018-05-12',
      locationId: 1,
    };

    expect(paciente).to.have.property('name').that.is.a('string');
    expect(paciente).to.have.property('birthdate').that.matches(/^\d{4}-\d{2}-\d{2}$/);
    expect(paciente).to.have.property('locationId').that.is.a('number');
  });
});
