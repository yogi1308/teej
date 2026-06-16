import "dotenv/config";
import express from "express";
import router from "./src/routes/router.ts"

const app = express();
app.use("/api", router);

const PORT = process.env.EXPRESS_PORT;
app.listen(PORT, (error : any) => {
    if (error) {
        throw error;
    }
    console.log(`Listening on port ${PORT}!`);
});

export default app;
