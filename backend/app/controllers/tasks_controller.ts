import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

export default class TasksController {
  public async index({ auth, response }: HttpContext) {
    const user = auth.user!

    try {
      const tasks = await Task.query().where('user_id', user.id)

      return response.ok({ tasks })
    } catch (error) {
      console.error(error)
      return response.internalServerError({ error: error })
    }
  }

  public async createTask({ request, auth, response }: HttpContext) {
    const user = auth.user!

    const payload = request.only(['title', 'description', 'status', 'user_id'])

    if (!payload.title || payload.title.trim() === '') {
      return response.badRequest({ message: 'Title is required' })
    }

    let assignedUserId = user.id

    if (user.role === 'admin' && payload.user_id) {
      assignedUserId = payload.user_id
    }

    try {
      const task = await Task.create({ ...payload, userId: assignedUserId })

      return response.created(task)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ error: error })
    }
  }

  public async updateTask({ request, response }: HttpContext) {
    try {
      const { id, ...updateData } = request.all()

      const foundTask = await Task.find(id)

      foundTask?.merge(updateData)
      await foundTask?.save()

      return response.ok(foundTask)
    } catch (error) {
      console.error(error)
      return response.badRequest({ error: error })
    }
  }

  public async destroy({ params, auth, response }: HttpContext) {
    await auth.check()
    const user = auth.user!

    const foundTask = await Task.find(params.id)

    if (!foundTask) {
      return response.ok({
        message: 'Task do not exist',
      })
    }

    if (foundTask.userId !== user.id && user.role !== 'admin') {
      return response.forbidden({
        message: 'You can only delete your own tasks',
      })
    }

    await foundTask?.delete()

    return response.ok({ message: 'Task deleted' })
  }
}
