import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { WorkspaceFactory, UserFactory } from 'Database/factories'

export default class AlexandreSeeder extends BaseSeeder {
  public async run () {
    // ---------------------------------
    // Default user registration
    // ---------------------------------

    // 1. create alexandre's account
    const alexandre = await UserFactory
      .merge({
        email: 'alexandre.tuet@epsi.fr',
        password: 'password',
        username: 'Alexandre',
        email_validated: true,
      })
      .create()

    // 2. create alexandre's workspace
    const alexandresWorkspace = await WorkspaceFactory
      .merge({
        name: 'Alexandre\'s Workspace',
        color: '#f56565',
        isPersonal: true,
      }).create()

    // 3. attach alexandre to its workspace
    await alexandre
      .related('workspaces')
      .attach({ [alexandresWorkspace.id]: { role: 'owner' } })

    // ---------------------------------
    // Add a user to a workspace
    // ---------------------------------

    // 4. add arthur to "alexandre's workspace"
    const arthur = await User.findBy('email', 'dufourarthur.perso@gmail.com')
    await arthur
      ?.related('workspaces')
      .attach({ [alexandresWorkspace.id]: { role: 'member' } })
  }
}

