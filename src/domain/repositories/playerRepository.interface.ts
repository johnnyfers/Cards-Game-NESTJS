import { Player } from "../entity/player.entity";

export interface PlayerRepository {
    findByUsername(username: string): Promise<Player>;
    insert(player: Player): Promise<void>;
}