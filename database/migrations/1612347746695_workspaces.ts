import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Workspaces extends BaseSchema {
  protected tableName = 'workspaces'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 32).notNullable().unique()
      table.string('color', 10).nullable().defaultTo('#4299e1')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
