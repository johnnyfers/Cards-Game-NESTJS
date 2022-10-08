import { ApiProperty } from '@nestjs/swagger';
import { Card, CardLanguage } from 'src/domain/entity/card.entity';
import { PlayerProps } from 'src/domain/entity/player.entity';

export class CardPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  priceBRL: number;
  @ApiProperty()
  similarCardsAmount: number;
  @ApiProperty()
  foil: boolean;
  @ApiProperty()
  language: CardLanguage;
  @ApiProperty()
  playerId: string;
  @ApiProperty()
  player: PlayerProps;

  constructor(card: Card) {
    const cardProps = card.getProps()
    
    this.id = cardProps.id
    this.foil = cardProps.foil
    this.name = cardProps.name
    this.language = cardProps.language
    this.priceBRL = cardProps.priceBRL
    this.similarCardsAmount = cardProps?.similarCardsAmount
    
    this.playerId = cardProps.playerId
    this.player = cardProps?.player
  }
}