import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Models/User'
import Token from 'App/Models/Token'
import Organization from 'App/Models/Organization'

/**
 * User
 */
export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
      email_validated: faker.random.boolean(),
    }
  })
  .state('email_validated', (user) => user.email_validated = true)
  .state('email_unvalidated', (user) => user.email_validated = false)
  .build()

/**
 * Token
 */
export const TokenFactory = Factory
  .define(Token, ({ faker }) => {
    return {
      value: faker.random.uuid(),
      type: faker.random.arrayElement(['EMAIL_VALIDATION']),
    }
  })
  .relation('user', () => UserFactory)
  .build()

/**
 * Organization
 */
export const OrganizationFactory = Factory
  .define(Organization, ({ faker }) => {
    return {
      name: faker.company.companyName(),
    }
  })
  .build()
