const { Pool } = require("pg");

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

    static async insert ({ material, shape, color, id}) {
        const { rows } = await Pool.query(
            `INSERT () INTO tiles VALUE ($1, $2, $3, $4), RETURNING *`,
        [material, shape, color, id])

        return Tile.rows[0];
    }
};
