import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WorkspaceValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  /*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 */
  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({ table: 'workspaces', column: 'name' }),
      rules.required(),
      rules.alpha(),
      rules.maxLength(32),
    ]),
    color: schema.string.optional({}, [
      rules.minLength(7),
      rules.maxLength(7),
    ]),
  })

  /**
	 * Custom messages for validation failures.
	 */
  public messages = {
    'name.unique': 'Workspace name already not available.',
    'name.required': 'Please provide a name for your workspace.',
    'name.alpha': 'Workspace name can only contain letters.',
    'name.maxLength': 'Your workspace\'s name can\'t be more than 32 characters long.',
    'color.minLength': 'Color must be in hexadecimal format.',
    'color.maxLength': 'Color must be in hexadecimal format.',
  }
}
