import { Card } from 'src/domain/entity/card.entity';
import { CardRepository } from 'src/domain/abstraction/repositories/cardRepository.interface';

export class GetCardsUseCases {
  constructor(private readonly cardRepository: CardRepository) { }

  async execute(playerId: string, name?: string): Promise<Card[]> {
    const cards = await this.cardRepository.findPlayerCards(playerId, name);
    return cards;
  }
}
