import { AddPlayerUseCase } from "src/app/useCases/player/addPlayer.usecase"
import { ExceptionsInMemory } from "src/infra/gateways/exceptions/exceptions.inmemory"
import { LoggerInMemory } from "src/infra/gateways/logger/logger.inmemory"
import { InMemomoryPlayerRepository } from "src/infra/gateways/repositories/inmemory/playerRepository.inmemory"
import { playerMocked } from "test/utilities/player.mock"

describe('AddPlayerUseCase', () => {
    let addPlayerUseCase: AddPlayerUseCase
    let playerRepository: InMemomoryPlayerRepository

    beforeEach(() => {
        playerRepository = new InMemomoryPlayerRepository()
        addPlayerUseCase = new AddPlayerUseCase(
            new LoggerInMemory(),
            new ExceptionsInMemory(),
            playerRepository
        )
    })

    it('should be able to create a player', async () => {
        const payload = {
            username: "new player",
            password: "new player"
        }
        const player = await addPlayerUseCase.execute(payload)
        const pProps = player.getProps()

        expect(pProps.id).toBeDefined()
        expect(pProps.username).toBe(payload.username)
    })

    it('should throw n error if username already exists', async () => {
        await playerRepository.insert(playerMocked)
        const payload = {
            username: playerMocked.getProps().username,
            password: "new player"
        }
        expect(() => {
            return addPlayerUseCase.execute(payload)
        })
            .rejects
            .toThrowError('Username already used')
    })
})