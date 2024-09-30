import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import TokenPayloadDTO from "../types/dto/tokenPayloadDto"

const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = req.headers.authorization
    const decoded: TokenPayloadDTO = jwt.verify(
      token || "",
      process.env.JWT_SECRET!
    ) as TokenPayloadDTO;
    // @ts-ignore
    req.user = decoded
    next()
  } catch (err) {
    console.log(err)
    res.sendStatus(401)
  }
}

export default verifyUser
