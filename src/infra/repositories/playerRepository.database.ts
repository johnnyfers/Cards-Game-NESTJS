import { Injectable } from "@nestjs/common";
import { Player } from "src/domain/entity/player.entity";
import { PlayerRepository } from "src/domain/repositories/playerRepository.interface";
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
            ...player.getProps()
        })
    }
}