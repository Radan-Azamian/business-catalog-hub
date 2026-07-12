const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // This will drop and recreate tables on every server restart
        console.log('PostgreSQL Database Connected Successfully!');
    } catch (error) {
        console.error(`Postgres Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = sequelize;
module.exports.connectDB = connectDB;