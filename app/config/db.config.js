import dotenv from "dotenv";


dotenv.config();

const pwd = process.env.DB_PASSWORD;
if (pwd === undefined || pwd === "") {
    // fail fast so the Sequelize layer doesn’t choke on an empty string
    throw new Error("Database password (DB_PASSWORD) is not set in the environment");
}

export default {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: pwd, // already guaranteed to be a non‑empty string
    DB: process.env.DB_NAME || "postgres",
    dialect: "postgres",
    PORT: parseInt(process.env.DB_PORT) || 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};