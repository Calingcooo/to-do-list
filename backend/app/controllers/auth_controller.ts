import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class AuthController {
  async index({ request, response }: HttpContext) {
    const { email, password } = request.all()

    try {
      const user = await User.findBy('email', email)

      if (!user) {
        return response.status(400).json({
          success: false,
          message: 'Invalid credentials',
        })
      }

      const isPasswordValid = await hash.verify(user.password, password)

      if (!isPasswordValid) {
        return response.abort({ success: false, message: 'Invalid credentials' })
      }

      const token = await User.accessTokens.create(user)

      return response.ok({
        success: true,
        message: 'Login success',
        token,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: 'Login failed',
        error: error.message,
      })
    }
  }

  async me({ auth, response }: HttpContext) {
    await auth.check()
    const user = auth.user!

    return response.ok({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    })
  }
}
