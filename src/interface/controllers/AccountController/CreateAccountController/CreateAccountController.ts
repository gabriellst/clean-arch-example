import { z } from 'zod'
import Controller from '../../Controller'
import CreateAccountSync from '@/application/useCases/CreateAccountSync/CreateAccountSync'
import { AccountRepository } from '@/domain/repositories'
import { Mediator } from '@/application/services'
import CreateAccountAsync from '@/application/useCases/CreateAccountAsync/CreateAccountAsync'

const CreateAccountRequestSchema = z.object({
  body: z.object({
    mode: z.enum(['sync', 'async']),
    name: z.string(),
    email: z.string(),
    password: z.string()
  })
})

const CreateAccountResponseSchema = z.any()

type CreateAccountRequest = z.infer<typeof CreateAccountRequestSchema>
type CreateAccountResponse = z.infer<typeof CreateAccountResponseSchema>

export default class CreateAccountController extends Controller<typeof CreateAccountRequestSchema, typeof CreateAccountResponseSchema> {
  constructor(readonly accountRepository: AccountRepository, readonly mediator: Mediator) {
    super(CreateAccountRequestSchema, CreateAccountResponseSchema)
  }

  async handleImplementation(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const { body } = request
    const { mode, name, email, password } = body
    const createAccountInput = {
      name,
      email,
      password
    }
    if (mode === 'async') {
      const createAccount = new CreateAccountAsync(this.mediator)
      return createAccount.execute(createAccountInput)
    }
    const createAccount = new CreateAccountSync(this.accountRepository)
    return await createAccount.execute(createAccountInput)
  }
}
