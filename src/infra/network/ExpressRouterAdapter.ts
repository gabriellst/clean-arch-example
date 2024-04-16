import { HttpRequest, HttpRouter } from '@interface/network'
import express, { Request, Response } from 'express'
import { Controller } from '@interface/controllers'

export default class ExpressRouterAdapter implements HttpRouter {
  app: any

  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  async on(path: string, method: string, controller: Controller<any, any>) {
    this.app[method](path, async (req: Request, res: Response) => {
      const controllerRequest: HttpRequest = { ...req }
      const controllerResponse = await controller.handle(controllerRequest)
      const { body, statusCode } = controllerResponse
      return res.status(statusCode).json(body)
    })
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}
