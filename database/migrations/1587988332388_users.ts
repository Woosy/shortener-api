import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('email', 255).notNullable().unique()
      table.boolean('email_validated').notNullable().defaultTo(false)
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.string('username', 32).nullable().unique()
      table.enu('role', ['user', 'admin']).defaultTo('user')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
