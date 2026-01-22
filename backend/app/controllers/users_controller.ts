import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async me({ auth, response }: HttpContext) {
    const user = auth.user!

    return response.ok({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    })
  }

  async newUser({ request, auth, response }: HttpContext) {
    await auth.check()
    const user = auth.user!

    if (user.role !== 'admin') {
      return response.unauthorized({ message: 'You do not have permission to create new user' })
    }

    const data = request.only(['fullName', 'email', 'password', 'role'])

    try {
      const createdUser = await User.create(data)

      return response.ok(createdUser)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ error: error })
    }
  }
}
