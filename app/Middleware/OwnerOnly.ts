import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import Workspace from 'App/Models/Workspace'

export default class OwnerOnly {
  public async handle ({ params, auth }: HttpContextContract, next: () => Promise<void>) {
    // retrieve workspace
    const workspace = await Workspace
      .query()
      .where('id', params.workspaceId)
      .preload('members')
      .firstOrFail()

    if (workspace.members.find((member: any) => member.$extras.pivot_role === 'owner')!.id !== auth.user!.id) {
      throw new UnauthorizedException('You must be the workspace owner to do that.')
    }

    await next()
  }
}
