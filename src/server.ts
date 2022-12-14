import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "../src/routes";

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (request: Request, response: Response) => {
    return response.json({ ok: true });
});

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        "status": "error",
        "message": "Internal Server Error"
    });
});

app.listen(3333);