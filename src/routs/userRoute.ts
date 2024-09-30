import { Request, Response } from "express"
import SignUpDTO from "../types/dto/signupDto"
import UserService from "../services/userService"

export const handleSignupRequst = async (
  req: Request<any, any, SignUpDTO>,
  res: Response
): Promise<void> => {
  try {
    const result = await UserService.signup(req.body)
    res.status(result.status!).json(result)
  } catch (err) {
    console.log(err)
  }
}
