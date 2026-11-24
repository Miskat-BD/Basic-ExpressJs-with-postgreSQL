import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
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

    const accessToken = jwt.sign(jwtPayload, config.secretToken, { expiresIn: "1d" })
    delete user.rows[0].password
    return { accessToken, user: user.rows[0] };
}



export const authService = {
    loginUserIntoDB
}