import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkspaceValidator from 'App/Validators/WorkspaceValidator'
import Workspace from 'App/Models/Workspace'
import User from 'App/Models/User'
import DeletePersonalWorkspaceException from 'App/Exceptions/DeletePersonalWorkspaceException'
import NotOwnerException from 'App/Exceptions/NotOwnerException'
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
    const workspace = await Workspace
      .query()
      .where('id', params.workspaceId)
      .firstOrFail()

    if (workspace.isPersonal) {
      throw new DeletePersonalWorkspaceException()
    }

    await workspace.delete()
  }

  /**
   * Get a workspace by its id
   */
  public async getById ({ params }: HttpContextContract) {
    const workspace = await Workspace
      .query()
      .where('id', params.workspaceId)
      .preload('members', (query) => {
        query.pivotColumns(['role'])
      })
      .firstOrFail()

    return workspace
  }

  /**
   * Add a user to current workspace
   */
  public async addMember ({ auth, params, request }: HttpContextContract) {
    const authUser = auth.user!

    // get workspace
    const workspace = await Workspace
      .query()
      .where('id', params.workspaceId)
      .preload('members', (query) => {
        query.wherePivot('role', 'owner')
      })
      .firstOrFail()

    // check if auth.user is owner
    const owner = workspace.members[0]
    if (authUser.id !== owner?.id) {
      throw new NotOwnerException()
    }

    // check if email is a valid user
    const user = await User
      .query()
      .where('email', request.input('email'))
      .firstOrFail()
      // TODO: message user not found

    // TODO: check if user isn't already member

    // add user to members
    await user
      .related('workspaces')
      .attach({ [workspace.id]: { role: 'member' } })

    await workspace.preload('members', (query) => {
      query.pivotColumns(['role'])
    })

    return workspace
  }
}
