import { Router } from "express"
import type { Request, Response } from "express"
import { cardStore } from "../store/cardStore"

const router = Router()

router.get("/", (_req: Request, res: Response) => {
  res.json(cardStore.getAllPublished())
})

export default router
