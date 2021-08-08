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
};
