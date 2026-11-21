import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connectionString
})

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            age INT,
            password VARCHAR(255),
            is_Active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );`);
        console.log("Database Connected!")
    } catch (error) {
        console.log(error)
    }
}