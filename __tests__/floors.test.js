const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Floor = require('../lib/models/Floor');

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

        expect(response.body).toEqual({
            id: '1',
            room: 'kitchen',
            length: 10,
            width: 5
        });
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

        expect(response.body).toEqual([{
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
        }]);
    });

    it('GET: gets one floor by id', async() => {
        const floor = await Floor.insert({
            room: 'kitchen',
            length: 10,
            width: 5
        });

        const response = await request(app)
            .get(`/api/v1/floors/${floor.id}`);

        expect(response.body).toEqual({
            id: '1',
            room: 'kitchen',
            length: 10,
            width: 5
        });
    });

    it('PUT: updates one floor by id', async() => {
        const floor = await Floor.insert({
            room: 'kitchen',
            length: 10,
            width: 5
        });

        const response = await request(app)
            .put(`/api/v1/floors/${floor.id}`)
            .send({
                room: 'kitchen',
                length: 12,
                width: 7
            });

        expect(response.body).toEqual({
            id: '1',
            room: 'kitchen',
            length: 12,
            width: 7
        });
    });

    it('DELETE: deletes one floor by id', async() => {
        const floor = await Floor.insert({
            room: 'kitchen',
            length: 10,
            width: 5
        });

        const response = await request(app)
            .delete(`/api/v1/floors/${floor.id}`);

        expect(response.body).toEqual({
            id: '1',
            room: 'kitchen',
            length: 10,
            width: 5
        });
    });
});
