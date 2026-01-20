import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async me({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    return response.ok({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    })
  }

  async newUser({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'role'])

    const user = await User.create(data)

    return response.ok(user)
  }
}
