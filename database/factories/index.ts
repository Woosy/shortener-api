import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'
import Token from 'App/Models/Token'
import Workspace from 'App/Models/Workspace'
import Link from 'App/Models/Link'
import Click from 'App/Models/Click'

// -------------------------------------
// -- User 
// -------------------------------------
export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      avatarUrl: faker.image.image(),
      email_validated: faker.random.boolean(),
    }
  })
  .state('email_validated', (user) => user.email_validated = true)
  .state('email_unvalidated', (user) => user.email_validated = false)
  .build()

// -------------------------------------
// -- Token 
// -------------------------------------
export const TokenFactory = Factory
  .define(Token, ({ faker }) => {
    return {
      value: faker.random.uuid(),
      type: faker.random.arrayElement(['EMAIL_VALIDATION']),
    }
  })
  .relation('user', () => UserFactory)
  .build()

// -------------------------------------
// -- Workspace 
// -------------------------------------
export const WorkspaceFactory = Factory
  .define(Workspace, ({ faker }) => {
    return {
      name: faker.company.companyName(),
      color: faker.internet.color(),
      isPersonal: false,
    }
  })
  .build()

// -------------------------------------
// -- Link 
// -------------------------------------
export const LinkFactory = Factory
  .define(Link, ({ faker }) => {
    return {
      title: faker.lorem.words(2),
      url: faker.internet.url(),
    }
  })

// -------------------------------------
// -- Click 
// -------------------------------------
export const ClickFactory = Factory
  .define(Click, ({ }) => {
    return {
    }
  })
