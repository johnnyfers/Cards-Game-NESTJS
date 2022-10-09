import { IException } from "src/domain/abstraction/expections/exceptions.interface";
import { Card } from "src/domain/entity/card.entity";

export class CardInvariant {
    constructor(
        private readonly exception: IException,
    ) { }

    handle(card: Card, playerId: string): void {
        if (!card)
            throw this.exception.badRequestException({
                message: 'Card not found',
            });
        const { playerId: cardPlayerId } = card.getProps();
        if (cardPlayerId !== playerId) {
            throw this.exception.forbiddenException({
                message: 'You cant perform actions on this card'
            });
        }
    }
}