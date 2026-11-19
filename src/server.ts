import express, { type Application, type Request, type Response } from "express"

const app: Application = express()
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is root route",
        author: "Miskat"
    })
})

app.post("/", async (req: Request, res: Response) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log(`The express server is running on the port ${port}`)
})