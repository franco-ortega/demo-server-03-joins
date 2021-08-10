const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('Endpoint tests for Floor model', () => {
    beforeEach(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));

    afterAll(() => pool.end());

    it('POST: creates a new floor', async() => {
        const response = await request(app)
            .post('/api/v1/floors')
            .send({
                room: 'kitchen',
                length: 10,
                width: 5
            });

        expect(response.body).toEqual(
            {
                id: '1',
                room: 'kitchen',
                length: 10,
                width: 5
            }
        );
    });

    it('GET: gets all floors', async() => {
        await request(app)
            .post('/api/v1/floors')
            .send({
                room: 'kitchen',
                length: 10,
                width: 5
        });

        await request(app)
            .post('/api/v1/floors')
            .send({
                room: 'bathroom',
                length: 6,
                width: 4
        });

        const response = await request(app)
            .get('/api/v1/floors');

        expect(response.body).toEqual(
            [{
                id: '1',
                room: 'kitchen',
                length: 10,
                width: 5
            },
            {
                id: '2',
                room: 'bathroom',
                length: 6,
                width: 4
            }]
        );
    });

});
