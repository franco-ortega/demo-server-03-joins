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

        return new Tile(rows[0]);
    };

    static async findAll() {
        const { rows } = await pool.query(
            `SELECT * FROM tiles`
        )

        return rows.map(tile => {
            return new Tile(tile);
        });
    };
};
