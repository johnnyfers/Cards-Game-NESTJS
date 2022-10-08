import { randomUUID } from 'crypto';
import { CardProps } from './card.entity';

export interface PlayerProps {
  id?: string;
  username: string;
  password: string;

  cards?: CardProps[];
}

export class Player {
  constructor(private props: PlayerProps) {
    if (!props?.id) props.id = randomUUID();
    this.props = props;
  }

  getProps(): PlayerProps {
    return this.props;
  }
}
