import { Injectable } from '@nestjs/common';
import { Card } from 'src/domain/entity/card.entity';
import { CardRepository } from '../../domain/repositories/cardRepository.interface';
import { PrismaService } from '../prisma/prisma-service/prisma-service.service';

@Injectable()
export class DatabaseCardRepository implements CardRepository {

  constructor(
    private prisma: PrismaService
  ) { }

  async insert(card: Card): Promise<void> {
    await this.prisma.card.create({
      ...card.getProps()
    })
  }

  async findAll(): Promise<Card[]> {
    const cards = await this.prisma.card.findMany()
    return cards.map(card => new Card(card))
  }

  async findById(id: string): Promise<Card> {
    const card = await this.prisma.card.findUnique({
      where: { id }
    })
    return new Card(card)
  }

  async updateContent(id: string, card: Card): Promise<void> {
    await this.prisma.card.update({
      where: { id: id },
      data: { 
        ...card.getProps() }
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.card.delete({ where: { id } })
  }
}