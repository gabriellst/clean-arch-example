import { Mediator } from '@/application/services'
import { Handler } from '@application/handlers'
import { DomainEvent } from '@/domain/events'

export default class MyMediator implements Mediator {
  handlers: Handler[]
  constructor() {
    this.handlers = []
  }
  async register(handler: Handler) {
    await this.handlers.push(handler)
  }

  async publish(event: DomainEvent) {
    for (const handler of this.handlers) {
      if (handler.eventName === event.name) {
        handler.handle(event)
      }
    }
  }
}
