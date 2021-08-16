const pool = require("../utils/pool");

module.exports = class Floor {
    id;
    room;
    length;
    width;

    constructor(row) {
        this.id = row.id;
        this.room = row.room;
        this.length = row.length;
        this.width = row.width;
    };

    static async insert({ room, length, width}) {
        const { rows } = await pool.query(
            'INSERT INTO floors (room, length, width) VALUES ($1, $2, $3) RETURNING *',
            [room, length, width]
        );

        if(!rows[0]) return 'There was an error adding this item to the table.'
        return new Floor(rows[0]);
    };

    static async findAll() {
        const { rows } = await pool.query(
            'SELECT * FROM floors'
        );

        if(rows.length === 0) return 'No floors were found.'
        return rows.map(floor => new Floor(floor));
    };

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM floors WHERE id=$1',
            [id]
        );

        if(!rows[0]) return `A floor with id ${id} was not found.`
        return new Floor(rows[0]);
    };

    static async update(id, { room, length, width}) {
        const { rows } = await pool.query(
            `
            UPDATE floors
            SET
              room=$1,
              length=$2,
              width=$3
            WHERE id=$4
            RETURNING *
            `,
            [room, length, width, id]
        );

        if(!rows[0]) return `A floor with id ${id} was not found.`
        return new Floor(rows[0]);
    };

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM floors WHERE id=$1',
            [id]
        );

        if(!rows[0]) return `A floor with id ${id} was not found.`
        return new Floor(rows[0]);
    };
};
