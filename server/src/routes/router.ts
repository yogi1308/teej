import { Router } from "express";
import musicRouter from "./musicRouter"
import blogRouter from "./blogRouter";
import merchRouter from "./merchRouter";
import indexRouter from "./indexRouter";
import authRouter from "./authRouter";

const router = Router()

router.use("/music", musicRouter)
router.use("/blog", blogRouter)
router.use("/merch", merchRouter)
router.use("/auth", authRouter)
router.use("/", indexRouter)

export default router
