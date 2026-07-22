import "dotenv/config";
import express from "express";
import router from "./src/routes/router"
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser())
app.use("/api", router);

if (!process.env.VERCEL) {
    const PORT = process.env.EXPRESS_PORT;
    app.listen(PORT, (error: any) => {
        if (error) throw error;
        console.log(`Listening on port ${PORT}!`);
    });
}

export default app;
