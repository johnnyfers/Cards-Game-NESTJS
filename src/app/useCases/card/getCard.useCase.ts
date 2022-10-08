import { Card } from "src/domain/entity/card.entity";
import { CardRepository } from "src/domain/repositories/cardRepository.interface";


export class GetCardUseCases {
    constructor(
        private readonly cardRepository: CardRepository
    ) { }

    async execute(id: string): Promise<Card> {
        const card = await this.cardRepository.findById(id)
        return card
    }
}
