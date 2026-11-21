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

const getAllUsersFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM users
        `)
    return result
}

const getUserByIdFromDB = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id])
    return result
}

const updateUserFromDB = async (payload: Partial<IUsers>, id: string) => {
    const { name, age, password, is_Active } = payload
    // console.log(name, age, password)
    const result = await pool.query(`
            UPDATE users 
            SET 
            name = COALESCE($1, name),
            age = COALESCE($2, age),
            password = COALESCE($3, password),
            is_Active = COALESCE($4, is_Active),
            updated_at = NOW()
            WHERE id = $5 RETURNING *;
            `, [name ?? null, age ?? null, password ?? null, is_Active ?? null, id])
    return result;
}

const deleteUserFromDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
        `, [id])
    return result
}

export const usersService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserFromDB,
    deleteUserFromDB
}