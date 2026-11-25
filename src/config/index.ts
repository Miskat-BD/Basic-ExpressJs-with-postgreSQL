import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    port: process.env.PORT,
    connectionString: process.env.DATABASE_URL as string,
    secretToken: process.env.SECRET_TOKEN as string,
    refreshSecretTokoen: process.env.REFRESH_SECRET as string
}

export default config;