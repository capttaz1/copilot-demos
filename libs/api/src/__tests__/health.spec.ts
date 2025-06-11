import request from 'supertest';
import app from '../src/main';

test('GET /health', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
});