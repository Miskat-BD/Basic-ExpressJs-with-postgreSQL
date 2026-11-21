import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/users/users.route";

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/users", userRoute)

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Miskat"
    })
})

export default app;