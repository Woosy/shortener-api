import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TagLinks extends BaseSchema {
  protected tableName = 'link_tag'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tag_id').references('tags.id').onDelete('cascade')
      table.integer('link_id').references('links.id').onDelete('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
