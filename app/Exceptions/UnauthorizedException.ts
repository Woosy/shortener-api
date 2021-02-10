import { Exception } from '@poppinss/utils'
// import { Exception } from '@adonisjs/core'

const code = 'E_UNAUTHORIZED'
const status = 403

export default class UnauthorizedException extends Exception {
  constructor (message: string) {
    super(message, status, code)
    this.message = message
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  handle (_, { response }) {
    return response.status(status).send({
      errors: [{
        status: status,
        code: code,
        message: this.message,
      }],
    })
  }
}
