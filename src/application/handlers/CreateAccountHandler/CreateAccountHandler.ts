import Handler from '../Handler'
import { AccountRepository } from '@/domain/repositories'
import { CreateAccountEvent } from '@/domain/events'

export default class CreateAccountHandler implements Handler {
  eventName = 'CreateAccountEvent'
  constructor(readonly accountRepository: AccountRepository) {}

  async handle(event: CreateAccountEvent): Promise<void> {
    const { name, email, password } = event
    await this.accountRepository.create(name, email, password)
  }
}
