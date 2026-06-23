import { Router } from "express";
import musicRouter from "./musicRouter"
import blogRouter from "./blogRouter";

const router = Router()

router.use("/music", musicRouter)
router.use("/blog", blogRouter)

export default router
