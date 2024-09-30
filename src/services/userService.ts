import { users } from "../data/data"
import ResponseData from "../types/dto/responseData"
import SignUpDTO from "../types/dto/signupDto"
import User from "../types/models/user"

export default class UserService {
  public static async signup(
    user: SignUpDTO
  ): Promise<ResponseData<{ id: string } | unknown>> {
    try {
      const { username, password } = user
      if (!username || !password) {
        return {
          err: true,
          message: "Missing mandatory data, username or password",
          status: 400,
        }
      }
      const newUser = new User(username)
      await newUser.hashPassword(password)
      users.push(newUser)
      return {
        err: false,
        message: "User signed up successfully",
        data: { id: newUser.id },
        status: 201,
      }
    } catch (err) {
      return {
        err: true,
        status: 500,
        data: err,
      }
    }
  }
}
