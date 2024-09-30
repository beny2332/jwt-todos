import { Request, Response } from "express"
import SignupDTO from "../types/dto/signupDto"
import AuthService from "../services/authService"

export const handleSigninRequst = async (
  req: Request<any, any, SignupDTO>,
  res: Response
): Promise<void> => {
  try {
    const result = await AuthService.signin(req.body)
    res.status(result.status!).json(result)
  } catch (err) {
    console.log(err)
  }
}
