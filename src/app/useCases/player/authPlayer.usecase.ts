import { AddPlayerDto } from "src/app/dto/player.dto";
import { TokenGenerator } from "src/domain/abstraction/auth/tokenGenerator.interface";
import { Player } from "src/domain/entity/player.entity";
import { IException } from "src/domain/abstraction/expections/exceptions.interface";
import { ILogger } from "src/domain/abstraction/logger/logger.interface";
import { PlayerRepository } from "src/domain/abstraction/repositories/playerRepository.interface";

export class AuthPlayerUseCase {
    constructor(
        private readonly logger: ILogger,
        private readonly exceptions: IException,
        private readonly playerRepository: PlayerRepository,
        private readonly jwt: TokenGenerator,
        ) { }

    async execute(addPlayerDto: AddPlayerDto): Promise<{
        player: Player,
        token: string
    }> {
        const playerExists = await this.playerRepository.findByUsername(addPlayerDto.username);
        if (!playerExists) this.forbiddenInvariant();
        const { password, username, id } = playerExists.getProps()
        if (password !== addPlayerDto.password) this.forbiddenInvariant();
        
        const token = this.jwt.getToken({
            sub: id,
            username
        })
        this.logger.log('AuthPlayerUseCase', `New player have been logged -- id ${id}`)

        return {
            player: playerExists,
            token
        }
    }

    forbiddenInvariant(): void {
        throw this.exceptions.forbiddenException({
            message: 'Username or Password are incorrect',
        })
    }
}