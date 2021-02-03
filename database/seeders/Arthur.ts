import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { OrganizationFactory, UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // -----------------------------------------------------------
    // create my account
    const arthur = await UserFactory
      .merge({
        email: 'dufourarthur.perso@gmail.com',
        password: 'password',
        username: 'Arthur',
        email_validated: true,
      })
      .create()

    const arthursOrg = await OrganizationFactory
      .merge({ name: 'Arthur\'s Workspace' })
      .create()

    await arthur
      .related('organizations')
      .attach({ [arthursOrg.id]: { role: 'owner' } })

    // -----------------------------------------------------------
    // create a second user + its organization, and add me to it
    const user = await UserFactory
      .merge({
        username: 'Test',
        email_validated: true,
      })
      .create()
    const testOrg = await OrganizationFactory
      .merge({ name: 'Test\'s Workspace' })
      .create()

    await user
      .related('organizations')
      .attach({ [testOrg.id]: { role: 'owner' } })
    await arthur
      .related('organizations')
      .attach({ [testOrg.id]: { role: 'member' } })
  }
}
