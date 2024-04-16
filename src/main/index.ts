// Routing
import { RouteConfig } from '@interface/routes'
import { ExpressRouterAdapter } from '@infra/network'

// Mediator
import { MyMediator } from '@infra/services'

//EventHandlers
import { CreateAccountHandler } from '@application/handlers'

//Database
import prisma from '@infra/database/config/prisma/config'
import { PrismaAccountRepository } from '@infra/database/repositories'

const startDatabaseConnections = async () => {
  await prisma.$connect()
}

startDatabaseConnections().then(() => {
  const accountRepository = new PrismaAccountRepository(prisma)

  const router = new ExpressRouterAdapter()

  const handlers = [new CreateAccountHandler(accountRepository)]

  const mediator = new MyMediator()

  handlers.forEach((handler) => {
    mediator.register(handler)
  })

  const routeConfig = new RouteConfig(router, mediator, accountRepository)

  routeConfig.start()
})
