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
    }

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
};
