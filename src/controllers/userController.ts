import { Router } from "express"
import { handleSignupRequst } from "../routs/userRoute"

const router = Router()

router.post('/signup', handleSignupRequst)

router.get('/profile', ()=>{})

export default router