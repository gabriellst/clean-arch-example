import { Mediator } from '@application/services'
import { AccountRepository } from '@/domain/repositories'
import { HttpRouter } from '../network/Http'
import CreateAccountController from '../controllers/AccountController/CreateAccountController/CreateAccountController'

export default class RouteConfig {
  constructor(readonly httpRouter: HttpRouter, readonly mediator: Mediator, readonly accountRepository: AccountRepository) {}

  start() {
    const port = Number(process.env.PORT) || 3000
    this.configMiddlewares()
    this.configRoutes()
    this.httpRouter.listen(port || 3000)
  }

  configRoutes() {
    this.httpRouter.on('/account', 'post', new CreateAccountController(this.accountRepository, this.mediator))
  }

  configMiddlewares() {}
}
