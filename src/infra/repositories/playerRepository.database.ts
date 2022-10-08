import { Injectable } from "@nestjs/common";
import { PlayerRepository } from "src/domain/abstraction/repositories/playerRepository.interface";
import { Player } from "src/domain/entity/player.entity";
import { PrismaService } from "../prisma/prisma-service/prisma-service.service";

@Injectable()
export class DatabasePlayerRepository implements PlayerRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    async findByUsername(username: string): Promise<Player> {
        const player = await this.prisma.player.findUnique({
            where: { username }
        })
        if (!player) return

        return new Player(player)
    }

    async insert(player: Player): Promise<void> {
        await this.prisma.player.create({
            data: {
                ...player.getProps()
            }
        })
    }
}