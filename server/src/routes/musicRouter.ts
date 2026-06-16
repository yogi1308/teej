import { Router } from "express";
import express from "express";

const musicRouter = Router();
musicRouter.post("/", express.json(), () => {
    console.log("hi");
});

export default musicRouter;
