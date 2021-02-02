import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'
import Token from 'App/Models/Token'
import EmailNotValidatedException from 'App/Exceptions/EmailNotValidatedException'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AuthController {
  /**
   * User sign-up
   */
  public async register ({ request }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)

    // create user
    const user = await User.create(data)

    // create token for user
    const token = new Token()
    token.type = 'EMAIL_VALIDATION'
    await token.related('user').associate(user)

    Logger.info(`Email confirmation link: http://127.0.0.1:3000/sign-up/${token.value}`)

    return { user, token }
  }

  /**
   * Validate email
   */
  public async validateEmail ({ request }: HttpContextContract) {
    // validate token type
    const data = await request.validate({
      schema: schema.create({
        token: schema.string({}, [
          rules.uuid({ version: 4 }),
        ]),
      }),
      messages: {
        'token.required': 'You must provide a token.',
        'token.uuid': 'Invalid token type.',
      },
    })

    // update user
    const token = await Token.findByOrFail('value', data.token)
    await User.query()
      .where('id', token.userId)
      .update({ email_validated: true })

    await token.delete()

    return { message: 'Email successfully validated!'}
  }

  /**
   * User sign-in
   */
  public async login ({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberUser = !!request.input('remember_me')

    // check for credentials
    const user = await auth.attempt(email, password, rememberUser)

    // check if email is validated
    if (!user.email_validated) {
      throw new EmailNotValidatedException()
    }
  }

  /**
   * Retrieve curently signed-in user
   */
  public async getUser ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return { user }
  }

  /**
   * Disconnect current user
   */
  public async logout ({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
