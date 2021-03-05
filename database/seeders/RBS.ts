import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { WorkspaceFactory, UserFactory, LinkFactory, TagFactory } from 'Database/factories'
import User from 'App/Models/User'

export default class ArthurSeeder extends BaseSeeder {
  public async run () {
    // ---------------------------------
    // 1. create RBS workspace
    // ---------------------------------

    const rbsWorkspace = await WorkspaceFactory
      .merge({
        name: 'RBS',
        color: '#f56565',
        isPersonal: false,
      }).create()

    // ---------------------------------
    // 2. get & create users
    // ---------------------------------

    const arthur = await User.findByOrFail('email', 'dufourarthur.perso@gmail.com')

    const arnaud = await UserFactory
      .merge({
        email: 'arnaud@road-b-score.com',
        password: 'password',
        username: 'Arnaud',
        avatarUrl: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5bc44ec6b7a4603f272819d5/be2afb87-9d53-4a86-b763-dddd7b9c5faf/48',
        email_validated: true,
      })
      .create()

    const manon = await UserFactory
      .merge({
        email: 'manon@road-b-score.com',
        password: 'password',
        username: 'Manon',
        avatarUrl: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5ba20ea42de4122f34c5b2b4/22694d2e-f67a-412b-9e76-3e03f8b56368/48',
        email_validated: true,
      })
      .create()

    const charlie = await UserFactory
      .merge({
        email: 'charlie@road-b-score.com',
        password: 'password',
        username: 'Charlie',
        avatarUrl: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5cf4e0734ddcda0e7cb94a0c/4b4003c0-1e85-41a5-8103-a6ccd351348c/48',
        email_validated: true,
      })
      .create()

    const christopheD = await UserFactory
      .merge({
        email: 'christophe.duc@road-b-score.com',
        password: 'password',
        username: 'Christophe D.',
        avatarUrl: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b9bb85db8c62b2c1fd96e44/a6b52c6b-5caa-4fe4-9031-4f573e470486/48',
        email_validated: true,
      })
      .create()

    const christopheM = await UserFactory
      .merge({
        email: 'christophe.meheut@road-b-score.com',
        password: 'password',
        username: 'Christophe M.',
        avatarUrl: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b9bb6f48a44a2467cd6f983/da910945-d46b-48d1-bd03-cfcea60bdd09/48',
        email_validated: true,
      })
      .create()

    // ---------------------------------
    // 3. attach users to RBS workspace
    // ---------------------------------

    await arnaud
      .related('workspaces')
      .attach({ [rbsWorkspace.id]: { role: 'owner' } })
    await arthur
      .related('workspaces')
      .attach({ [rbsWorkspace.id]: { role: 'member' } })
    await manon
      .related('workspaces')
      .attach({ [rbsWorkspace.id]: { role: 'member' } })
    await charlie
      .related('workspaces')
      .attach({ [rbsWorkspace.id]: { role: 'member' } })
    await christopheD
      .related('workspaces')
      .attach({ [rbsWorkspace.id]: { role: 'member' } })
    await christopheM
      .related('workspaces')
      .attach({ [rbsWorkspace.id]: { role: 'member' } })

    // ---------------------------------
    // 4. add links to RBS workspace
    // ---------------------------------

    // create a lot of links
    const arthursLinks = await LinkFactory
      .merge({ workspaceId: rbsWorkspace.id })
      .createMany(10)
    await arthur
      .related('links')
      .saveMany(arthursLinks)

    const manonsLinks = await LinkFactory
      .merge({ workspaceId: rbsWorkspace.id })
      .createMany(10)
    await manon
      .related('links')
      .saveMany(manonsLinks)

    const charliesLinks = await LinkFactory
      .merge({ workspaceId: rbsWorkspace.id })
      .createMany(10)
    await charlie
      .related('links')
      .saveMany(charliesLinks)

    // custom link with tag
    const link = await LinkFactory
      .merge({ workspaceId: rbsWorkspace.id })
      .create()
    await arthur
      .related('links')
      .save(link)

    const tag = await TagFactory
      .create()
    await link
      .related('tags')
      .save(tag)
  }
}
