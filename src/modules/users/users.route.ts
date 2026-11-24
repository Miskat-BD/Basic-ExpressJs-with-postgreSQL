import { Router } from "express";
import { usersController } from "./users.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router()

// /api/v1/users
router.post("/", usersController.createUser)
router.get("/", auth(USER_ROLE.admin, USER_ROLE.agent), usersController.getAllUsers)
router.get("/:id", auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user), usersController.getUserById)
router.put("/:id", auth(USER_ROLE.admin, USER_ROLE.user), usersController.updateUserById)
router.delete("/:id", usersController.deleteUserById)

export const userRoute = router