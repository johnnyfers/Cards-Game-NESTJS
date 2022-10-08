import { Player } from "../../entity/player.entity";

export interface AuthenticationResponse {
  token: string;
  user: Player;
}
