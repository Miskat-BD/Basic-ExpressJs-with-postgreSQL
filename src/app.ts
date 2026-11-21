import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db";
import { userRoute } from "./modules/users/users.route";

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

app.use("/api/v1/users", userRoute)


export default app;