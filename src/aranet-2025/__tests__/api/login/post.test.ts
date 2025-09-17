import request from 'supertest';

// Mejor compilado y en "produccion"

const baseURL = 'http://localhost:3000';

describe('POST /api/login', () => {
  let cookie: string;

  it('Devuelve 200 para login de super-admin', async () => {
    const loginResponse = await request(baseURL)
      .post('/api/login')
      .send({ username: 'pablo', password: '1234' });

    expect(loginResponse.status).toBe(200);
    const data = loginResponse.body;
    expect(data.data.roles).toStrictEqual(['admin', 'member']);
    expect(data.data.password).toBe(undefined);
    expect(data.data.salt).toBe(undefined);
    expect(data.data.algorithm).toBe(undefined);
  });

});
