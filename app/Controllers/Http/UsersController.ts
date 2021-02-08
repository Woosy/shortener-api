import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class UsersController {
  /**
   * Return all workspaces of user (owner/member)
   */
  public async getWorkspaces ({ auth }: HttpContextContract) {
    const user = auth.user!

    const workspaces = await user
      .related('workspaces')
      .query()
      .where('user_id', user.id)
      .preload('members', (query) => {
        query.pivotColumns(['role'])
      })

    return workspaces
  }
}
