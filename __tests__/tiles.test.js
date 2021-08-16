const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Floor = require('../lib/models/Floor');
const Tile = require('../lib/models/Tile');

describe('Endpoint tests for Tile model', () => {
    beforeEach(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));

    afterAll(() => pool.end());

    it('POST: creates a new Tile', async() => {
        const floor = await Floor.insert({
            room: 'kitchen',
            length: 10,
            width: 5
        });

        const response = await request(app)
            .post('/api/v1/tiles')
            .send({
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 2,
                floorId: floor.id
            });

        expect(response.body).toEqual({
            id: '1',
            material: 'ceramic',
            shape: 'square',
            color: 'green',
            cost: 2,
            floorId: floor.id
        });
    });

    it('GET: gets all Tiles', async() => {
        const floor = await Floor.insert({
            room: 'kitchen',
            length: 10,
            width: 5
        });

        await request(app)
            .post('/api/v1/tiles')
            .send({
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 2,
                floorId: floor.id
            });

        await request(app)
            .post('/api/v1/tiles')
            .send({
                material: 'stone',
                shape: 'circle',
                color: 'grey',
                cost: 5,
                floorId: floor.id
            });

        const response = await request(app)
            .get('/api/v1/tiles');

        expect(response.body).toEqual([{
            id: '1',
            material: 'ceramic',
            shape: 'square',
            color: 'green',
            cost: 2,
            floorId: floor.id
        },
        {
            id: '2',
            material: 'stone',
            shape: 'circle',
            color: 'grey',
            cost: 5,
            floorId: floor.id
        }]);
    });

    it('GET: gets one tile by id', async() => {
        const floor = await Floor.insert({
            room: 'kitchen',
            length: 10,
            width: 5
        });

        const tile = await Tile.insert({
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 2,
                floorId: floor.id
            });

        const response = await request(app)
            .get(`/api/v1/tiles/${tile.id}`);

        expect(response.body).toEqual({
                id: '1',
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 2,
                floorId: floor.id
        });
    });

    it('PUT: updates a Tile by id', async() => {
        const floor = await Floor.insert({
                room: 'kitchen',
                length: 10,
                width: 5
        });

        const tile = await Tile.insert({
            material: 'ceramic',
            shape: 'square',
            color: 'green',
            cost: 2,
            floorId: floor.id
        });

        const response = await request(app)
            .put(`/api/v1/tiles/${tile.id}`)
            .send({
                material: 'ceramic',
                shape: 'square',
                color: 'green',
                cost: 5,
                floorId: floor.id
            });

        expect(response.body).toEqual({
            id: '1',
            material: 'ceramic',
            shape: 'square',
            color: 'green',
            cost: 5,
            floorId: floor.id
        });
    });

    it('DELETE: deletes a Tile by id', async() => {
        const floor = await Floor.insert({
            room: 'kitchen',
            length: 10,
            width: 5
        });

        const tile = await Tile.insert({
            material: 'ceramic',
            shape: 'square',
            color: 'green',
            cost: 5,
            floorId: floor.id
        });

        const response = await request(app)
            .delete(`/api/v1/tiles/${tile.id}`);

        expect(response.body).toEqual({
            id: '1',
            material: 'ceramic',
            shape: 'square',
            color: 'green',
            cost: 5,
            floorId: floor.id
        });
    });
});
