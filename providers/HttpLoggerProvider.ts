import { IocContract } from '@adonisjs/fold'
import Logger from 'App/Logger'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready, when this file is loaded by the framework.
| Hence, the level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
*/
export default class HttpLoggerProvider {
  constructor (protected container: IocContract) {
  }

  public async boot () {
    const Server = this.container.use('Adonis/Core/Server')
    const AdonisLogger = this.container.use('Adonis/Core/Logger')

    Server.hooks.after(async (ctx) => {
      const logger = new Logger(ctx, AdonisLogger)
      logger.hook()
    })
  }
}
