import { Sequelize } from "sequelize";
import dbConfig from "./config/db.config.js";
import tutorialModel from "./models/tutorial.model.js";

// Create Sequelize instance using config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    logging: false // Set to console.log to see SQL queries
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.tutorials = tutorialModel(sequelize, Sequelize);

export default db;