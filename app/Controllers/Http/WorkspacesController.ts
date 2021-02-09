import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkspaceValidator from 'App/Validators/WorkspaceValidator'
import Workspace from 'App/Models/Workspace'
export default class WorkspacesController {
  /**
   * Create a new workspace
   */
  public async create ({ request, auth }: HttpContextContract) {
    const data = await request.validate(WorkspaceValidator)
    const user = auth.user!

    const workspace = await Workspace.create(data)
    await user
      .related('workspaces')
      .attach({ [workspace.id]: { role: 'owner' }})

    await workspace.refresh()
    await workspace.preload('members', (query) => {
      query.pivotColumns(['role'])
    })

    return workspace
  }

  /**
   * Delete a workspace and its members
   */
  public async delete ({ params }: HttpContextContract) {
    await Workspace
      .query()
      .where('id', params.workspaceId)
      .delete()
  }
}
