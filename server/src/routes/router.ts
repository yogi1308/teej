import { Router } from "express";
import musicRouter from "./musicRouter.js"
import blogRouter from "./blogRouter.js";
import clothingRouter from "./clothingRouter.js";
import indexRouter from "./indexRouter.js";
import authRouter from "./authRouter.js";
import donateRouter from "./donateRouter.js";

const router = Router()

router.use("/music", musicRouter)
router.use("/blog", blogRouter)
router.use("/clothing", clothingRouter)
router.use("/auth", authRouter)
router.use("/donate", donateRouter)
router.use("/", indexRouter)

export default router
