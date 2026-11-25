import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async (payload: any) => {
    const { email, password } = payload
    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])
    // console.log(user.rows[0])
    if (user.rowCount === 0) {
        throw new Error("Invalid credential !")
    }

    const matchedPassword = await bcrypt.compare(password, user.rows[0].password)
    if (!matchedPassword) {
        throw new Error("Password not matched")
    }

    if (!user.rows[0].is_active) {
        throw new Error("access denied!")
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, config.secretToken, { expiresIn: "1h" })
    const refreshSecret = jwt.sign(jwtPayload, config.refreshSecretTokoen, { expiresIn: "10d" })
    delete user.rows[0].password
    return { accessToken, refreshSecret, user: user.rows[0] };
}

const generateAccessToken = async (token: string) => {
    if (!token) {
        throw new Error("Unauthorized")
    }

    const decode = jwt.verify(token, config.refreshSecretTokoen) as JwtPayload
    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [decode.email])

    if (user.rowCount === 0) {
        throw new Error("User not found!")
    }
    if (!user.rows[0].is_active) {
        throw new Error("Forbidden!")
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, config.secretToken, { expiresIn: "1h" })
    return { accessToken }
}



export const authService = {
    loginUserIntoDB,
    generateAccessToken
}