import DomainEvent from './DomainEvent'

export default class CreateAccountEvent implements DomainEvent {
  name = 'CreateAccountEvent' // Identificador para dar match do evento ao handler.
  constructor(readonly accountName: string, readonly email: string, readonly password: string) {}
}
