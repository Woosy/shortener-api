import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkspaceValidator from 'App/Validators/WorkspaceValidator'
import Workspace from 'App/Models/Workspace'
import User from 'App/Models/User'
import NotFoundException from 'App/Exceptions/NotFoundException'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
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
      throw new UnauthorizedException('You cannot delete your personal workspace')
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
      .preload('members')
      .firstOrFail()

    // check if auth.user is owner
    const owner = workspace.members.find((member: any) => member.$extras.pivot_role === 'owner')
    if (authUser.id !== owner?.id) {
      throw new UnauthorizedException('You must be the workspace owner to do that.')
    }

    // // check if email is a valid user
    const user = await User
      .query()
      .where('email', request.input('email'))
      .firstOrFail()
      .catch(() => {
        throw new NotFoundException('User not found.')
      })

    // check if user isn't already member
    if (workspace.members.some((member: any) => member.id === user.id)) {
      throw new UnauthorizedException('Already a member.')
    }

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
