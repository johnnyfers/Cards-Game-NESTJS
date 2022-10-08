import { CardDto } from "src/app/dto/card.dto";
import { Card } from "src/domain/entity/card.entity";
import { ILogger } from "src/domain/abstraction/logger/logger.interface";
import { CardRepository } from "src/domain/abstraction/repositories/cardRepository.interface";
import { TranslationAPI } from "src/domain/abstraction/translateAPI/translationAPI.interface";

export class AddCardUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly cardRepository: CardRepository,
        private readonly translationAPI: TranslationAPI
    ) { }

    async execute(addCardDto: CardDto, playerId: string): Promise<Card> {
        const translatedName = await this.translationAPI.translate(addCardDto.name, 'pt')
        const card = new Card({
            ...addCardDto,
            playerId,
            name: translatedName
        })
        await this.cardRepository.insert(card)
        this.logger.log('addCardUseCases execute', `New card have been inserted -- id ${card.getProps().id}`);
        return card
    }
}
