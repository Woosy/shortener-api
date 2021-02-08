import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Workspace from 'App/Models/Workspace'

export default class UsersController {
  /**
   * Return all workspaces of user (owner/member)
   */
  public async getWorkspaces ({ auth }: HttpContextContract) {
    const user = auth.user!

    const workspaces = await Workspace
      .query()
      .preload('members', (query) => {
        query.wherePivot('user_id', user.id)
      })

    return workspaces
  }
}
