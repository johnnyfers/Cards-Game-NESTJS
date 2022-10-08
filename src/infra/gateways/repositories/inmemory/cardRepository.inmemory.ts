import { CardRepository } from "src/domain/abstraction/repositories/cardRepository.interface";
import { Card } from "src/domain/entity/card.entity";

export class InMemoryCardRepository implements CardRepository {
  cards: Card[]

  constructor() {
    this.cards = []
  }

  async insert(card: Card): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findPlayerCards(playerId: string, name?: string): Promise<Card[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Card> {
    throw new Error("Method not implemented.");
  }
  async updateContent(id: string, card: Card): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }


}