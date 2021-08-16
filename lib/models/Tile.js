const pool = require('../utils/pool')

module.exports = class Tile {
    id;
    material;
    shape;
    color;
    cost;
    floorId;

    constructor(row) {
        this.id = row.id;
        this.material = row.material;
        this.shape = row.shape;
        this.color = row.color;
        this.cost = row.cost;
        this.floorId = row.floor_id;
    }

    static async insert({ material, shape, color, cost, floorId }) {
        const { rows } = await pool.query(
            `INSERT INTO tiles (material, shape, color, cost, floor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [material, shape, color, cost, floorId])

        if(!rows[0]) return 'There was an error adding this item to the table.'
        return new Tile(rows[0]);
    };

    static async findAll() {
        const { rows } = await pool.query(
            'SELECT * FROM tiles'
        )

        if(rows.length === 0) return `Tiles do not exist.`
        return rows.map(tile => new Tile(tile));
    };

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM tiles WHERE id=$1',
            [id]
        );

        if(!rows[0]) return `Tile with id ${id} does not exist.`
        return new Tile(rows[0]);
    }

    static async update(id, { material, shape, color, cost, floorId }) {
        const { rows } = await pool.query(
            `
            UPDATE tiles
            SET
              material=$1,
              shape=$2,
              color=$3,
              cost=$4,
              floor_id=$5
            WHERE id=$6
            RETURNING *
            `,
            [material, shape, color, cost, floorId, id]
        )

        console.log('TILES: ' + rows[0])

        if(!rows[0]) return `Tile with id ${id} does not exist.`
        return new Tile(rows[0]);
    };

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM tiles WHERE id=$1 RETURNING *',
            [id]
        );

        if(!rows[0]) return `Tile with id ${id} does not exist.`
        return new Tile(rows[0]);
    }
};
