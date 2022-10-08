import { CardDto } from "src/app/dto/card.dto";
import { Card } from "src/domain/entity/card.entity";
import { ILogger } from "src/domain/logger/logger.interface";
import { CardRepository } from "src/domain/repositories/cardRepository.interface";

export class AddCardUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly cardRepository: CardRepository
    ) { }

    async execute(addCardDto: CardDto, playerId: string): Promise<Card> {
        const card = new Card({...addCardDto, playerId, similarCardsAmount: 5})
        await this.cardRepository.insert(card)
        this.logger.log('addCardUseCases execute', `New card have been inserted -- id ${card.getProps().id}`);
        return card
    }
}
