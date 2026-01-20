import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  public async newUser({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'role'])

    const user = await User.create(data)

    return response.ok(user)
  }
}
