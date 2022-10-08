import { PartialCardDto } from "src/app/dto/card.dto";
import { Card } from "src/domain/entity/card.entity";
import { IException } from "src/domain/expections/exceptions.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { CardRepository } from "src/domain/repositories/cardRepository.interface";

export class UpdateCardUseCases {
    constructor(
        private readonly exception: IException,
        private readonly logger: ILogger,
        private readonly cardRepository: CardRepository
    ) { }

    async execute(updateCardDto: PartialCardDto, id: string, playerId: string): Promise<void> {
        const card = await this.cardRepository.findById(id)
        if (!card) throw this.exception.badRequestException({
            message: 'Card not found',
        })
        if (!card) {
            throw this.exception.badRequestException({
                message: "Card not found"
            })
        }
        const { playerId: cardPlayerId } = card.getProps()
        if (cardPlayerId !== playerId) {
            throw this.exception.forbiddenException()
        }
        const newCard = new Card({
            ...card.getProps(),
            ...updateCardDto
        })
        await this.cardRepository.updateContent(id, newCard)
        this.logger.log('updateCardUseCases execute', `Card ${id} have been updated`)
    }
}
