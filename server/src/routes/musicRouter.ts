import { Router } from "express";
import express from "express";

const musicRouter = Router();
musicRouter.post("/", express.json(), (req, res) => {
    console.log("hi");
    console.log(req)
    res.status(200).json({ success: true, message: "Music uploaded" })
});

export default musicRouter;
