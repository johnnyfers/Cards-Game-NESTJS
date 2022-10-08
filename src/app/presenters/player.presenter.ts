import { ApiProperty } from '@nestjs/swagger';
import { CardProps } from 'src/domain/entity/card.entity';
import { Player } from 'src/domain/entity/player.entity';

export class PlayerPresenter {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  cards?: CardProps[];

  constructor(player: Player) {
    const playerProps = player.getProps();

    this.id = playerProps.id;
    this.username = playerProps.username;
    this.cards = playerProps.cards;
  }
}
