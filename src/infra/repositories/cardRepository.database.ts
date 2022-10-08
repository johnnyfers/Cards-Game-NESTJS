import { Injectable } from '@nestjs/common';
import { CardRepository } from 'src/domain/abstraction/repositories/cardRepository.interface';
import { Card } from 'src/domain/entity/card.entity';
import { PrismaService } from '../prisma/prisma-service/prisma-service.service';

@Injectable()
export class DatabaseCardRepository implements CardRepository {

  constructor(
    private prisma: PrismaService
  ) { }

  async insert(card: Card): Promise<void> {
    const cProps = card.getProps()
    await this.prisma.card.create({
      data: {
        id: cProps?.id,
        edition: cProps.edition,
        foil: cProps.foil,
        language: cProps.language,
        name: cProps.name,
        priceBRL: cProps.priceBRL,
        player: {
          connect: {
            id: cProps.playerId
          }
        }
      }
    })
  }

  async findPlayerCards(playerId: string, name?: string): Promise<Card[]> {
    const cards = await this.prisma.card.findMany({
      where: {
        playerId,
        name
      },
      orderBy: {
        priceBRL: 'desc'
      }
    })
    if (!cards) return
    return cards.map(card => new Card(card))
  }

  async findById(id: string): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: { id }
    })
    if (!card) return
    return new Card(card)
  }

  async updateContent(id: string, card: Card): Promise<void> {
    const cProps = card.getProps()

    await this.prisma.card.update({
      where: { id: id },
      data: {
        edition: cProps.edition,
        foil: cProps.foil,
        language: cProps.language,
        name: cProps.name,
        priceBRL: cProps.priceBRL,
      }
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.card.delete({ where: { id } })
  }

  async playerSimilarCards(card: Card): Promise<number> {
    const cProps = card.getProps()

    const similarCards = await this.prisma.card.count({
      where:{
        foil: cProps.foil,
        edition: cProps.edition,
        language: cProps.language,
        priceBRL: cProps.priceBRL,
      }
    }) 
    return
  }
}