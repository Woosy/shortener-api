import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TokenFactory } from 'Database/factories'

export default class TokenSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    await TokenFactory
      .merge({
        type: 'EMAIL_VALIDATION',
      })
      .with('user', 1, (user) => user.apply('email_unvalidated'))
      .create()
  }
}
