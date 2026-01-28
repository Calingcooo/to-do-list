import { HttpContext } from '@adonisjs/core/http'
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

    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      return response.badRequest({ message: 'Email is already used' })
    }

    if (existingUser) {
      return response.badRequest({ message: 'Email is alread used.' })
    }

    try {
      const createdUser = await User.create(data)

      return response.ok({
        user: {
          id: createdUser.id,
          fullName: createdUser.fullName,
          email: createdUser.email,
          role: createdUser.role,
          createdAt: createdUser.createdAt,
        },
      })
    } catch (error) {
      console.error(error)
      return response.internalServerError({ error: error })
    }
  }

  async getAllUsers({ auth, response }: HttpContext) {
    const user = auth.user!

    if (user.role !== 'admin') {
      return response.unauthorized({ message: 'You have no permission for this action' })
    }

    try {
      const users = await User.query().whereNot('id', user.id).preload('tasks')

      const usersWithTaskCount = users.map((u) => ({
        ...u.serialize(),
        taskCount: u.tasks.length,
      }))

      return response.ok({ users: usersWithTaskCount })
    } catch (error) {
      console.error(error)
      return response.internalServerError({ error })
    }
  }
}
