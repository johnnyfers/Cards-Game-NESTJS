import { Card } from "src/domain/entity/card.entity";
import { IException } from "src/domain/expections/exceptions.interface";
import { CardRepository } from "src/domain/repositories/cardRepository.interface";


export class GetCardUseCases {
    constructor(
        private readonly exception: IException,
        private readonly cardRepository: CardRepository
    ) { }

    async execute(id: string, playerId: string): Promise<Card> {
        const card = await this.cardRepository.findById(id)
        if (!card) {
            throw this.exception.badRequestException({
                message: "Card not found"
            })
        }
        const {playerId: cardPlayerId} = card.getProps()
        if (cardPlayerId !== playerId) {
            throw this.exception.forbiddenException()
        }
        return card
    }
}
