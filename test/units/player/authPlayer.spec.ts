import { AuthPlayerUseCase } from "src/app/useCases/player/authPlayer.usecase"
import { JWTAuthInMemory } from "src/infra/auth/jwt.auth.inmemory"
import { ExceptionsInMemory } from "src/infra/gateways/exceptions/exceptions.inmemory"
import { LoggerInMemory } from "src/infra/gateways/logger/logger.inmemory"
import { InMemomoryPlayerRepository } from "src/infra/gateways/repositories/inmemory/playerRepository.inmemory"
import { playerMocked } from "test/utilities/player.mock"

describe('AuthPlayerUseCase', () => {
    let authPlayerUseCase: AuthPlayerUseCase
    let playerRepository: InMemomoryPlayerRepository

    beforeEach(() => {
        playerRepository = new InMemomoryPlayerRepository()
        authPlayerUseCase = new AuthPlayerUseCase(
            new LoggerInMemory(),
            new ExceptionsInMemory(),
            playerRepository,
            new JWTAuthInMemory()
        )
    })

    it('should be able to auth a player', async () => {
        await playerRepository.insert(playerMocked)

        const payload = {
            username: playerMocked.getProps().username,
            password: playerMocked.getProps().password
        }
        const { player, token } = await authPlayerUseCase.execute(payload)
        const pProps = player.getProps()

        expect(token).toBeDefined()
        expect(pProps.id).toBeDefined()
        expect(pProps.username).toBe(payload.username)
    })

    it('should throw an error if username or password are wrong', async () => {
        await playerRepository.insert(playerMocked)
        const payloadWrongPassword = {
            username: playerMocked.getProps().username,
            password: playerMocked.getProps().password + 'wrong'
        }
        const payloadWrongUsername = {
            username: playerMocked.getProps().username + 'wrong',
            password: playerMocked.getProps().password
        }
        
        expect(() => {
            return authPlayerUseCase.execute(payloadWrongPassword)
        })
            .rejects
            .toThrowError('Username or Password are incorrect')
        expect(() => {
            return authPlayerUseCase.execute(payloadWrongUsername)
        })
            .rejects
            .toThrowError('Username or Password are incorrect')
    })
})