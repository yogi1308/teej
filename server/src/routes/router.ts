import { Router } from "express";
import musicRouter from "./musicRouter"

const router = Router()

router.use("music", musicRouter)

export default router
