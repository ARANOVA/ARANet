import request from 'supertest';

// Mejor compilado y en "produccion"

const baseURL = 'http://localhost:3000';

describe('POST /api/me', () => {
  let cookie: string;

  beforeAll(async () => {
    const loginResponse = await request(baseURL)
      .post('/api/login')
      .send({ username: 'pablo', password: '1234' });

    expect(loginResponse.status).toBe(200);

    // Captura cookie de la cabecera Set-Cookie
    const rawCookie = loginResponse.headers['set-cookie'];
    cookie = rawCookie?.[0].split(';')[0]; // ejemplo: "session=abcd1234"
  });

  it('Devuelve el unauthorized for request without login', async () => {
    const res = await request(baseURL)
      .get('/api/me')
      ;

    expect(res.status).toBe(401);
  });

  it('Devuelve el usuario logueado', async () => {
    const res = await request(baseURL)
      .get('/api/me')
      .set('Cookie', cookie)
      ;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      statusCode: 200,
      data: expect.objectContaining({
        id: expect.any(Number),
        username: 'pablo',
        roles: ['admin', 'member'],
        is_active: 1,
        is_super_admin: expect.any(Number),
        created_at: expect.any(String),
        last_login: expect.any(String),
      })
    });
    const { deleted_by, deleted_at, last_login } = res.body.data;
    expect(
      deleted_by === null || typeof deleted_by === "number"
    ).toBe(true);
    expect(
      deleted_at === null || typeof deleted_at === "string"
    ).toBe(true);
    expect(
      last_login === null || typeof last_login === "string"
    ).toBe(true);
  });

});
