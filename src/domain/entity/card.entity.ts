import { randomUUID } from 'crypto';
import { PlayerProps } from './player.entity';

export type CardLanguage = 'JAPANESE' | 'ENGLISH' | 'PORTUGUESE';

export interface CardProps {
  id?: string;
  name: string;
  edition: string;
  language: CardLanguage | string;
  foil: boolean;
  priceBRL: number;

  playerId: string;
  player?: PlayerProps;
}

export class Card {
  constructor(private props: CardProps) {
    if (!props.id) randomUUID();
    this.props = props;
  }

  getProps(): CardProps {
    return this.props;
  }
}
