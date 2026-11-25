import type { Request, Response } from "express";
import { usersService } from "./users.service";
import sendResponse from "../../utils/sendResponse";

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

const getAllUsers = async (req: Request, res: Response) => {
    try {
        console.log(req.user)
        const result = await usersService.getAllUsersFromDB()
        // res.status(200).json({
        //     success: true,
        //     message: "All Users Data Retrived Successfully !!",
        //     data: result.rows
        // })
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "All Users Data Retrived Successfully !!",
            data: result.rows
        })
    } catch (error: any) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message,
        //     error: error
        // })
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        // console.log(typeof(id))
        const result = await usersService.getUserByIdFromDB(id as string)
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
}

const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await usersService.updateUserFromDB(req.body, id as string)
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
}

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await usersService.deleteUserFromDB(id as string)
        // console.log(result)
        if (result.rowCount === 0) {
            return res.status(404).json({
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
}

export const usersController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}