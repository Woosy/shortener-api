import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Organizations extends BaseSchema {
  protected tableName = 'organizations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 32).notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
