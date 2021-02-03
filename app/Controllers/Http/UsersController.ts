import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  /**
   * Return all workspaces of user (owner/member)
   */
  public async getWorkspaces ({ auth }: HttpContextContract) {
    const user = auth.user!
    await user.preload('workspaces')
    return user.workspaces
  }
}
