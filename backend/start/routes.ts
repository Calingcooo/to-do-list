/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from '#controllers/users_controller'
import TasksController from '#controllers/tasks_controller'
import AuthController from '#controllers/auth_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    ;(router.get('user-tasks', [TasksController, 'index']),
      router.post('create', [TasksController, 'createTask']),
      router.put('edit/:id', [TasksController, 'updateTask']),
      router
        .delete('delete/:id', [TasksController, 'destroy'])
        .where('id', router.matchers.number()))
  })
  .prefix('task')
  .use(middleware.auth({ guards: ['api'] }))

router
  .group(() => {
    router.post('new-user', [UsersController, 'newUser'])
  })
  .prefix('user')

router
  .group(() => {
    ;(router.post('login', [AuthController, 'index']), router.get('me', [AuthController, 'me']))
  })
  .prefix('auth')
