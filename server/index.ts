import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.EXPRESS_PORT;
app.listen(PORT, (error : any) => {
    if (error) {
        throw error;
    }
    console.log(`Listening on port ${PORT}!`);
});

export default app;
