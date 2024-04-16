import { Account } from '@domain/entities'

export default interface AccountRepository {
  create(name: string, email: string, password: string): Promise<Account>
  getById(id: string): Promise<Account | undefined>
}
