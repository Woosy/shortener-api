import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { OrganizationFactory, UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // normal admin account
    const arthur = await UserFactory
      .merge({
        email: 'dufourarthur.perso@gmail.com',
        email_validated: true,
        password: 'password',
        username: 'Arthur',
        role: 'admin',
      })
      .create()

    await OrganizationFactory
      .merge({
        name: 'Arthur\'s Workspace',
        authorId: arthur.id,
      })
      .create()

    // random users
    // await UserFactory
    //   .merge({ role: 'user' })
    //   .createMany(5)
  }
}
