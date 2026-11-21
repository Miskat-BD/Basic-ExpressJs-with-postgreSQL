import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db";

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Miskat"
    })
})

app.post("/api/v1/users", async (req: Request, res: Response) => {
    try {
        const { name, email, age, password } = req.body
        // console.log(password)
        const result = await pool.query(`
        INSERT INTO users (name, email, age, password) VALUES 
        ($1, $2, $3, $4) RETURNING *
        `, [name, email, age, password])
        res.status(201).json({
            success: true,
            message: "User Created !!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

app.get("/api/v1/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users
        `)
        res.status(200).json({
            success: true,
            message: "All Users Data Retrived Successfully !!",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
            SELECT * FROM users WHERE id = $1
            `, [id])
        // console.log(result)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "User Data is Retrived",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, age, password, is_Active } = req.body
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
        // console.log(result)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "User data updated successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
        DELETE FROM users
        WHERE id = $1
        `, [id])
        // console.log(result)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "user data deleted successfully !",
            // data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

export default app;