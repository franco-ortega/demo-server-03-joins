const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('Endpoint tests for Tile model', () => {
    beforeAll(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));

    afterAll(() => pool.end());

    it('POST: creates a new Tile', async() => {
        const response = await request(app)
            .post('/api/v1/tiles')
            .send({
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 2
            });

            expect(response.body).toEqual(
                {
                    id: '1',
                    material: 'ceramic',
                    shape: 'square',
                    color: 'green',
                    cost: 2
                }
            );
    });

    it('GET: gets all Tiles', async() => {
        const response = await request(app)
            .get('/api/v1/tiles');

        expect(response.body).toEqual(
            [{
                id: '1',
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 2
            }]
        );
    });

    it('PUT: updates a Tile by id', async() => {
        const response = await request(app)
            .put('/api/v1/tiles/1')
            .send({
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 5
            });

            expect(response.body).toEqual(
                {
                    id: '1',
                    material: 'ceramic',
                    shape: 'square',
                    color: 'green',
                    cost: 5
                }
            );
    });

    it('DELETE: deletes a Tile by id', async() => {
        const response = await request(app)
            .delete('/api/v1/tiles/1');

            expect(response.body).toEqual(
                {
                    id: '1',
                    material: 'ceramic',
                    shape: 'square',
                    color: 'green',
                    cost: 5
                }
            );
    });
});
