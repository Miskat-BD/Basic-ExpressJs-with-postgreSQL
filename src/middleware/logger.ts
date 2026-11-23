import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
    //   console.log('Time:', Date.now(), "Method:", req.method, "URL:", req.url);
    
    const log = `\nMethod: ${req.method} | URL: ${req.url} | Time: ${Date.now()}\n`
    fs.appendFile("logger.txt", log, (err) => {
        // console.log("Logger Error:", err)
    })
    next();
}

export default logger;