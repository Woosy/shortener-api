import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'
import Token from 'App/Models/Token'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      email: faker.internet.email(),
      email_validated: faker.random.boolean(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      role: faker.random.arrayElement(['user', 'admin']),
    }
  })
  .state('email_validated', (user) => user.email_validated = true)
  .state('email_unvalidated', (user) => user.email_validated = false)
  .build()

export const TokenFactory = Factory
  .define(Token, ({ faker }) => {
    return {
      value: faker.random.uuid(),
      type: faker.random.arrayElement(['EMAIL_VALIDATION']),
    }
  })
  .relation('user', () => UserFactory)
  .build()
