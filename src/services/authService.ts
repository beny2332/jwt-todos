import jwt, { Jwt } from "jsonwebtoken"
import ResponseData from "../types/dto/responseData"
import SignUpDTO from "../types/dto/signupDto"
import { users } from "../data/data"
import TokenPayloadDTO from "../types/dto/tokenPayloadDto"
import signinResponseDto from "../types/dto/signinResponseDto"

export default class AuthService {
  public static async signin(
    userFromReq: SignUpDTO
  ): Promise<ResponseData<signinResponseDto | unknown>> {
    try {
      // validations
      const { username, password } = userFromReq
      if (!username || !password) {
        return {
          err: true,
          message: "Missing mandatory data, username or password",
          status: 400,
        }
      }
      // try find the user
      const user = users.find((u) => u.username === username)
      // return errors if no user/password matching
      if (!user) {
        return {
          err: true,
          message: "user not found",
          status: 400,
        }
      }

      if (!(await user.comparePassword(password))) {
        return {
          err: true,
          message: "Wrong password",
          status: 401,
        }
      }
      // create token
      const payload: TokenPayloadDTO = {
        id: user.id,
        username: username,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "10m",
      })

      // return the token to the route
      return {
        err: false,
        status: 200,
        data: { token },
      }
    } catch (err) {
      // handle errors
      return {
        err: true,
        message: "An error occurred during signin",
        status: 500,
        data: err,
      }
    }
  }
}
