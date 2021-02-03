import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrganizationUser extends BaseSchema {
  protected tableName = 'organization_user'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.integer('organization_id')
      table.enu('role', ['member', 'owner'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
