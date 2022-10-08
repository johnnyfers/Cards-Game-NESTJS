import { Card } from "../entity/card.entity";

export interface CardRepository {
  insert(card: Card): Promise<void>;
  findAll(): Promise<Card[]>;
  findById(id: string): Promise<Card>;
  updateContent(id: string, card: Card): Promise<void>;
  deleteById(id: string): Promise<void>;
}