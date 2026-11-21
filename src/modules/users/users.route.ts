import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router()
// /api/v1/users
router.post("/", usersController.createUser)
router.get("/", usersController.getAllUsers)
router.get("/:id", usersController.getUserById)
router.put("/:id", usersController.updateUserById)
router.delete("/:id", usersController.deleteUserById)

export const userRoute = router