import { Request } from 'express';
import { Player } from '../entity/player.entity';

export interface AuthRequest extends Request {
  user: Player;
}
