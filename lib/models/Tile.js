const pool = require('../utils/pool')

module.exports = class Tile {
    id;
    material;
    shape;
    color;
    cost;

    constructor(row) {
        this.id = row.id;
        this.material = row.material;
        this.shape = row.shape;
        this.color = row.color;
        this.cost = row.cost;
    }

    static async insert({ material, shape, color, cost}) {
        const { rows } = await pool.query(
            `INSERT INTO tiles (material, shape, color, cost) VALUES ($1, $2, $3, $4) RETURNING *`,
        [material, shape, color, cost])

        if(!rows[0]) return 'There was an error adding this item to the table.'
        return new Tile(rows[0]);
    };

    static async findAll() {
        const { rows } = await pool.query(
            'SELECT * FROM tiles'
        )

        return rows.map(tile => new Tile(tile));
    };

    static async update(id, { material, shape, color, cost }) {
        const { rows } = await pool.query(
            `UPDATE tiles SET material=$1, shape=$2, color=$3, cost=$4
            WHERE id=$5
            RETURNING *
            `,
            [material, shape, color, cost, id]
        )

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
