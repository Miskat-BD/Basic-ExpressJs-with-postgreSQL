import { Router, type NextFunction, type Request, type Response } from "express";
import { usersController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router()

// /api/v1/users
router.post("/", usersController.createUser)
router.get("/",auth, usersController.getAllUsers)
router.get("/:id", usersController.getUserById)
router.put("/:id", usersController.updateUserById)
router.delete("/:id", usersController.deleteUserById)

export const userRoute = router