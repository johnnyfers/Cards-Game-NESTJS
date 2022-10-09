import { CardRepository } from "src/domain/abstraction/repositories/cardRepository.interface";
import { Card } from "src/domain/entity/card.entity";

export class InMemoryCardRepository implements CardRepository {
  cards: Card[]

  constructor() {
    this.cards = []
  }

  async insert(card: Card): Promise<void> {
    this.cards.push(card)
  }

  async findPlayerCards(playerId: string, name?: string): Promise<Card[]> {
    let playerCards = this.cards.filter(c => c.getProps().playerId === playerId)
    if (!playerCards.length) return
    if (name) {
      playerCards = this.cards.filter(c => c.getProps().name === name)
    }

    return this.sortCardsHelper(playerCards)
  }

  async findById(id: string): Promise<Card> {
    return this.cards.find(c => c.getProps().id === id)
  }
  
  async updateContent(id: string, card: Card): Promise<void> {
    this.cards = this.cards.map(c => {
      if (c.getProps().id !== id) return c
      return card
    })
  }

  async deleteById(id: string): Promise<void> {
    this.cards = this.cards.filter(c => c.getProps().id !== id)
  }

  private sortCardsHelper(card: Card []) {
    return card.sort((a,b)=> b.getProps().priceBRL - a.getProps().priceBRL)
  }
}