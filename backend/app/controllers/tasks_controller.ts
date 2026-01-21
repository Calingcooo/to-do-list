import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

export default class TasksController {
  public async index({ response }: HttpContext) {
    const tasks = await Task.query()

    return response.ok({ tasks })
  }

  public async createTask({ request, auth, response }: HttpContext) {
    await auth.check()

    const data = request.all()

    const task = await Task.create(data)

    return response.created(task)
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

    if (foundTask.user_id !== user.id && user.role !== 'admin') {
      return response.forbidden({
        message: 'You can only delete your own tasks',
      })
    }

    await foundTask?.delete()

    return response.ok({ message: 'Task deleted' })
  }
}
