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
};
