import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WorkspaceUser extends BaseSchema {
  protected tableName = 'user_workspace'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.integer('workspace_id')
      table.enu('role', ['member', 'owner'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
