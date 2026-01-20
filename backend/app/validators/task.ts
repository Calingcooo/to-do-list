import vine from '@vinejs/vine'

export const createTaskValidation = () =>
  vine.compile(
    vine.object({
      title: vine.string().trim(),
    })
  )
