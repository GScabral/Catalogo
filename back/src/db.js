require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');



const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    native: false,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Render suele necesitar SSL para conexiones seguras
            rejectUnauthorized: false, // Ajusta esto según sea necesario
        },
    },
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