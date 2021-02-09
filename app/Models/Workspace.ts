import { DateTime } from 'luxon'
import { column, BaseModel, manyToMany, ManyToMany, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Workspace extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public color: string

  @column()
  public isPersonal: boolean

  @manyToMany(() => User)
  public members: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
