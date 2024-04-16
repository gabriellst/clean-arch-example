import { Mediator } from '@/application/services'
import { CreateAccountAsyncInput } from './CreateAccountAsyncInput'
import { CreateAccountEvent } from '@/domain/events'
import { CreateAccountAsyncOutput } from './CreateAccountAsyncOutput'

export default class CreateAccountAsync {
  constructor(readonly mediator: Mediator) {}

  async execute(input: CreateAccountAsyncInput): Promise<CreateAccountAsyncOutput> {
    const { name, email, password } = input
    const createAccountEvent = new CreateAccountEvent(name, email, password)
    void this.mediator.publish(createAccountEvent)
    return {
      message: 'creating'
    }
  }
}
