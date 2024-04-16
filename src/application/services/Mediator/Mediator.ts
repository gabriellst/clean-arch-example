import { Handler } from "@application/handlers";
import { DomainEvent } from "@domain/events";

export default interface Mediator {
    register: (handler: Handler) => Promise<void>;
    publish: (event: DomainEvent) => Promise<void>;
}