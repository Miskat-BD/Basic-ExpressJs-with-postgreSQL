import type { Request, Response } from "express";
import { pool } from "../../db";
import { usersService } from "./users.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await usersService.createUserIntoDB(req.body)
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
}

export const usersController = {
    createUser
}