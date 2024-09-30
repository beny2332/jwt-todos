import { Router } from "express"
import { handleProfileRequest, handleSignupRequst } from "../routs/userRoute"
import verifyUser from "../middlewares/verifyUser"

const router = Router()

router.post('/signup', handleSignupRequst)

router.get('/profile',verifyUser ,handleProfileRequest)

export default router