import { Exception } from '@poppinss/utils'
// import { Exception } from '@adonisjs/core'

const code = 'E_DELETE_PERSONAL_WORKSPACE'
const status = 412
const message = 'Cannot delete personal workspace.'

export default class DeletePersonalWorkspaceException extends Exception {
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
