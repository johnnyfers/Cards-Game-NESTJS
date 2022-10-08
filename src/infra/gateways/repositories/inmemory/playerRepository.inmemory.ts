import { PlayerRepository } from "src/domain/abstraction/repositories/playerRepository.interface";
import { Player } from "src/domain/entity/player.entity"

export class InMemomoryPlayerRepository implements PlayerRepository {
    public player: Player[]
    
    constructor() {
        this.player = [];
    }
  
    async findByUsername(username: string): Promise<Player> {
      return this.player.find(p=>p.getProps().username === username)
    }
  
    async insert(player: Player): Promise<void> {
      this.player.push(player);
    }
  }
  