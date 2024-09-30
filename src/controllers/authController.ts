import { Router } from "express"
import { handleSigninRequst } from "../routs/authRoute"

const router = Router()

router.post("/signin", handleSigninRequst)
router.delete("/signout", () => {})

export default router
