import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Link from 'App/Models/Link'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value: string

  @manyToMany(() => Link)
  public links: ManyToMany<typeof Link>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
