require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/catalogo`, {
    logging: false,
    native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, '/models', file));
        modelDefiners.push(model)
    });

modelDefiners.forEach(model => model(sequelize, DataTypes));




module.exports = {
    ...sequelize.models,
    conn: sequelize
}