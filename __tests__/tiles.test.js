const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('Endpoint tests for Tile model', () => {
    beforeEach(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));

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
});
