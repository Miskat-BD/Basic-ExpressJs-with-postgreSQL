import express, { type Application, type Request, type Response } from "express"
import { userRoute } from "./modules/users/users.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import fs from "fs";

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    //   console.log('Time:', Date.now(), "Method:", req.method, "URL:", req.url);
    const log = `\nMethod: ${req.method} | URL: ${req.url} | Time: ${Date.now()}\n`
    fs.appendFile("logger.txt", log, (err) => {
        console.log(err)
    })
    next();
});

app.use("/api/v1/users", userRoute)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth", authRoute)

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Miskat"
    })
})

export default app;