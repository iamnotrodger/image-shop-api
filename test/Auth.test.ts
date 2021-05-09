import request from 'supertest';
import app from '../src/app';
import connection from '../src/utils/connection';

describe('Test Auth Routes', () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.clear();
        await connection.close();
    });

    test('Sign-Up [Invalid Request]', async () => {
        const response = await request(app)
            .post('/api/auth/sign-up')
            .send({ name: 'name', pass: 'pass' })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(422);
    });

    test('Sign-Up', async () => {
        const response = await request(app)
            .post('/api/auth/sign-up')
            .send({ username: 'username', password: 'password' })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('access_token');
    });

    test('Login [Invalid Request]', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ name: 'name', pass: 'pass' })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(422);
    });

    test('Login', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'username', password: 'password' })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('access_token');
    });
});
