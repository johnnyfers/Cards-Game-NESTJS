import { Card } from 'src/domain/entity/card.entity';

export interface CardRepository {
  insert(card: Card): Promise<void>;
  findPlayerCards(playerId: string, name?: string): Promise<Card[]>;
  findById(id: string): Promise<Card>;
  playerSimilarCards(card: Card): Promise<number>;
  updateContent(id: string, card: Card): Promise<void>;
  deleteById(id: string): Promise<void>;
}
