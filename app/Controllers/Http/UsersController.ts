import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  /**
   * Return all organizations of user (owner/member)
   */
  public async getOrganizations ({ auth }: HttpContextContract) {
    const user = auth.user!
    await user.preload('organizations')
    return user.organizations
  }
}
