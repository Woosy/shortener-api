import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Link from 'App/Models/Link'
import Click from 'App/Models/Click'
import Workspace from 'App/Models/Workspace'
import Tag from 'App/Models/Tag'
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
    if (data.title) { link.title = data.title }
    if (data.key) { link.key = data.key }

    await user
      .related('links')
      .save(link)

    // create/associate tags
    if (data.tags) {
      for await (const tag of data.tags) {
        const payload = { value: tag.text }
        const temp = await Tag.firstOrCreate(payload, payload)
        await link
          .related('tags')
          .save(temp)
      }
    }

    // const tag = data.tags?[0]

    await link.refresh()
    await link.preload('user')
    await link.preload('clicks')
    await link.preload('tags')

    return link
  }

  /**
   * Delete a link (by its id)
   */
  public async delete ({ params }: HttpContextContract) {
    const link = await Link.findByOrFail('id', params.linkId)
    await link.delete()
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
