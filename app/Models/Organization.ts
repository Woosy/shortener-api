import { DateTime } from 'luxon'
import { column, beforeCreate, BelongsTo, BaseModel, belongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from 'App/Models/User'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @beforeCreate()
  public static async randomId (organization: Organization) {
    if (!organization.id) {
      organization.id = uuidv4()
    }
  }

  @column()
  public name: string

  @column()
  public authorId: number
  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  public author: BelongsTo<typeof User>

  @hasMany(() => User)
  public members: HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
