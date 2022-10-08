import { Card } from "src/domain/entity/card.entity";
import { CardRepository } from "src/domain/repositories/cardRepository.interface";


export class GetCardsUseCases {
    constructor(
        private readonly cardRepository: CardRepository
    ) { }

    async execute(): Promise<Card[]> {
        const cards = await this.cardRepository.findAll()
        return cards
    }
}
