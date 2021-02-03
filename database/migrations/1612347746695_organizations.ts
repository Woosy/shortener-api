import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Organizations extends BaseSchema {
  protected tableName = 'organizations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamps(true)
      table.string('name', 32).notNullable().unique()
      table.uuid('author_id').references('id').inTable('users')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
