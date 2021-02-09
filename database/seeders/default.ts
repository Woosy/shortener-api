import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { WorkspaceFactory, UserFactory } from 'Database/factories'

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

    const arthursWorkspace = await WorkspaceFactory
      .merge({
        name: 'Arthur\'s Workspace',
        color: '#f56565',
        isPersonal: true,
      }).create()

    await arthur
      .related('workspaces')
      .attach({ [arthursWorkspace.id]: { role: 'owner' } })

    // -----------------------------------------------------------
    // create a second user + its workspace, and add me to it
    const user = await UserFactory
      .merge({
        username: 'Test',
        password: 'password',
        email_validated: true,
      })
      .create()

    const testWorkspace = await WorkspaceFactory
      .merge({
        name: 'Test\'s Workspace',
        color: '#ed8936',
        isPersonal: true,
      }).create()

    await user
      .related('workspaces')
      .attach({ [testWorkspace.id]: { role: 'owner' } })

    await arthur
      .related('workspaces')
      .attach({ [testWorkspace.id]: { role: 'member' } })

    // -----------------------------------------------------------
    // create a third user + its workspace, not related to me
    const user2 = await UserFactory
      .merge({
        username: 'Arthur Dufour',
        email: 'arthur.dufour@epsi.fr',
        password: 'password',
        email_validated: true,
      })
      .create()

    const user2Workspace = await WorkspaceFactory
      .merge({
        name: 'Arthur Dufour\'s Workspace',
        isPersonal: true,
      }).create()

    await user2
      .related('workspaces')
      .attach({ [user2Workspace.id]: { role: 'owner' } })
  }
}
