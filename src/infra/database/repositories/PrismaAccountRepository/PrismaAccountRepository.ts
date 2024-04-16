import { Account } from '@/domain/entities'
import { AccountRepository } from '@/domain/repositories'
import { PrismaClient } from '@prisma/client'

export default class PrismaAccountRepository implements AccountRepository {
  constructor(readonly client: PrismaClient) {}
  async create(name: string, email: string, password: string): Promise<Account> {
    const passwordHash = password //Implementação do hash
    const dbAccount = await this.client.account.create({
      data: {
        name,
        email,
        passwordHash
      }
    })
    const { id } = dbAccount
    return new Account(id, name, email, password)
  }
  async getById(id: string): Promise<Account | undefined> {
    const dbAccount = await this.client.account.findUnique({ where: { id } })
    if (!dbAccount) return
    const { id: accountId, name, email, passwordHash } = dbAccount
    const decryptedPassword = passwordHash // Implementação da decriptação
    return new Account(accountId, name, email, decryptedPassword)
  }
}
