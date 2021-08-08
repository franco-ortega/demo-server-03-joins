const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');

describe('Endpoint tests for Tile model', () => {
    it('sample test', () => {
        expect(true).toBe(true);
    });

    it('POST: creates a new Tile', async() => {
        const response = await request(app)
            .post('/api/v1/tiles')
            .send({
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 1.5
            });

            expect(response.body).toEqual(
                {
                    id: 1,
                    material: 'ceramic',
                    shape: 'square',
                    color: 'green',
                    cost: 1.5
                }
            );
    });
});