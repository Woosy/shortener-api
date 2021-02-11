import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Link from 'App/Models/Link'
import Click from 'App/Models/Click'
import Workspace from 'App/Models/Workspace'
import LinkValidator from 'App/Validators/LinkValidator'

export default class LinksController {
  /**
   * Create a link
   */
  public async create ({ request, auth }: HttpContextContract) {
    const data = await request.validate(LinkValidator)
    const user = auth.user!

    const workspace = await Workspace
      .query()
      .where('id', request.input('workspaceId'))
      .firstOrFail()

    const link = new Link()
    link.workspaceId = workspace.id
    link.longUrl = data.url
    // link.title = data.title // TODO: manage optional title
    // link.key = 'test' // TODO: manage custom key

    await user
      .related('links')
      .save(link)

    return link
  }

  /**
   * Get link by its key (and create associated click)
   */
  public async getByKey ({ response, params }: HttpContextContract) {
    const key = params.key

    const link = await Link.findByOrFail('key', key)

    await Click.create({ linkId: link.id })

    return response.redirect(link.longUrl)
  }
}
