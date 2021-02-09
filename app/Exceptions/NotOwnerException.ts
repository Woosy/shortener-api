import { Exception } from '@poppinss/utils'
// import { Exception } from '@adonisjs/core'

const code = 'E_NOT_OWNER'
const status = 403
const message = 'You must be the workspace owner to do that.'

export default class NotOwnerException extends Exception {
  constructor () {
    super(message, status, code)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  handle (_, { response }) {
    return response.status(status).send({
      errors: [{
        status: status,
        code: code,
        message: message,
      }],
    })
  }
}
