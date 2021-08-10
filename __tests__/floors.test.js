const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('Endpoint tests for Floor model', () => {
    beforeEach(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));

    afterAll(() => pool.end());

    it('POST: creates a new Floor', async() => {
        const response = await request(app)
          .post('/api/v1/floors')
          .send(
              {
                  room: 'kitchen',
                  length: 10,
                  width: 5
              }
          );

        expect(response.body).toEqual(
            {
                id: 1,
                room: 'kitchen',
                length: 10,
                width: 5
            }
        );
    });

});
