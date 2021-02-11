import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { WorkspaceFactory, UserFactory } from 'Database/factories'

export default class ArthurSeeder extends BaseSeeder {
  public async run () {
    // ---------------------------------
    // Default user registration
    // ---------------------------------

    // 1. create arthur's account
    const arthur = await UserFactory
      .merge({
        email: 'dufourarthur.perso@gmail.com',
        password: 'password',
        username: 'Arthur',
        email_validated: true,
      })
      .create()

    // 2. create arthur's workspace
    const arthursWorkspace = await WorkspaceFactory
      .merge({
        name: 'Arthur\'s Workspace',
        color: '#f56565',
        isPersonal: true,
      }).create()

    // 3. attach arthur to its workspace
    await arthur
      .related('workspaces')
      .attach({ [arthursWorkspace.id]: { role: 'owner' } })
  }
}
