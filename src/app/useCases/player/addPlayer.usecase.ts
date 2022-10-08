import { Player } from "src/domain/entity/player.entity";
import { IException } from "src/domain/expections/exceptions.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { PlayerRepository } from "src/domain/repositories/playerRepository.interface";

export class AddPlayerUseCase {
    constructor(
        private readonly logger: ILogger,
        private readonly exceptions: IException,
        private readonly playerRepository: PlayerRepository
    ) { }

    async execute(addPlayerDto): Promise<void> {
        const playerExists = await this.playerRepository.findByUsername(addPlayerDto.username);
        if (!playerExists) throw this.exceptions.badRequestException({
            message: 'Username already used',
        })
        const player = new Player(addPlayerDto)
        await this.playerRepository.insert(addPlayerDto)

        this.logger.log('AddPlayerUseCase', `New player have been inserted -- id ${player.getProps().id}`)
    }
}