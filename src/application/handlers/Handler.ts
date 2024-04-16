import { DomainEvent } from "@domain/events";

export default interface Handler {
    eventName: string;
    handle(event: DomainEvent): Promise<void>;
}