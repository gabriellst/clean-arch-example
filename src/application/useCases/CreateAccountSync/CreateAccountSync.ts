import { CreateAccountSyncInput } from './CreateAccountSyncInput'
import { CreateAccountSyncOutput } from './CreateAccountSyncOutput'
import { AccountRepository } from '@/domain/repositories'

export default class CreateAccountSync {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: CreateAccountSyncInput): Promise<CreateAccountSyncOutput> {
    const { name, email, password } = input
    const createdAccount = await this.accountRepository.create(name, email, password)
    const { id } = createdAccount
    return { accountId: id }
  }
}
