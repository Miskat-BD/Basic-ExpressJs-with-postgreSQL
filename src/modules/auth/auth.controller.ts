import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body)
        const { refreshSecret } = result
        res.cookie("refreshSecret", refreshSecret, {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            // maxAge:
            path: "/",
            domain: "localhost"
        })
        res.status(200).json({
            success: true,
            message: 'user login successfully',
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const generateToken = async (req: Request, res: Response) => {
    try {
        // console.log(req.cookies.refreshSecret)
        const result = await authService.generateAccessToken(req.cookies.refreshSecret)
        res.status(201).json({
            success: true,
            message: "Refresh token generated successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

export const authController = {
    loginUser,
    generateToken
}