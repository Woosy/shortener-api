import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // normam admin account
    await UserFactory
      .merge({
        email: 'dufourarthur.perso@gmail.com',
        email_validated: true,
        password: 'password',
        username: 'Arthur',
        role: 'admin',
      })
      .create()

    // random users
    // await UserFactory
    //   .merge({ role: 'user' })
    //   .createMany(5)
  }
}
