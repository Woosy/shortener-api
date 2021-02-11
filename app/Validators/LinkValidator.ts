import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LinkValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    title: schema.string.optional({}, [
      rules.maxLength(64),
    ]),
    url: schema.string({}, [
      rules.required(),
      rules.url(),
      rules.maxLength(512),
    ]),
    // key: schema.string.optional({}, [
    //   rules.unique({ table: 'links', column: 'key' }),
    //   rules.maxLength(512),
    // ]),
    workspaceId: schema.number(),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {
    'title.maxLength': 'Link\'s title can\'t be more than 64 characters long.',
    'url.required': 'Please provide an URL to shorten.',
    'url.url': 'Please provide a valid URL.',
    'url.maxLength': 'Your link can\'t be more than 512 characters long.',
    'workspaceId.required': 'Please provide a workspaceId.',
  }
}
