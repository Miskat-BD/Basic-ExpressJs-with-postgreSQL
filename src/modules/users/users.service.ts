import { pool } from "../../db";
import type { IUsers } from "./users.interface";

const createUserIntoDB = async (payload: IUsers) => {
    const { name, email, age, password } = payload
    // console.log(password)
    const result = await pool.query(`
        INSERT INTO users (name, email, age, password) VALUES 
        ($1, $2, $3, $4) RETURNING *
        `, [name, email, age, password])

    return result;
}

export const usersService = {
    createUserIntoDB
}