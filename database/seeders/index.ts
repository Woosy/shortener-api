import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ArthurSeeder from './Arthur'
import AlexandreSeeder from './Alexandre'

export default class IndexSeeder extends BaseSeeder {
  public async run () {
    await new ArthurSeeder(this.client).run()
    await new AlexandreSeeder(this.client).run()
  }
}
