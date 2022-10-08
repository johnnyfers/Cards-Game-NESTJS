import { Card } from 'src/domain/entity/card.entity';
import { CardRepository } from 'src/domain/abstraction/repositories/cardRepository.interface';

export class GetCardsUseCases {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(name: string, playerId: string): Promise<Card[]> {
    const cards = await this.cardRepository.findPlayerCards(playerId, name);
    return cards;
  }
}
