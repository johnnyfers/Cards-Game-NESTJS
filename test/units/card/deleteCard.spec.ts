import { InMemoryCardRepository } from "src/infra/gateways/repositories/inmemory/cardRepository.inmemory"
import { LoggerInMemory } from "src/infra/gateways/logger/logger.inmemory"
import { DeleteCardUseCases } from "src/app/useCases/card/deleteCard.useCase"
import { ExceptionsInMemory } from "src/infra/gateways/exceptions/exceptions.inmemory"
import { playerMocked, playerMocked2 } from '../../utilities/player.mock'
import { cardsMocked } from '../../utilities/card.mock'

describe('deleteCardUseCases', () => {
    let cardRepository: InMemoryCardRepository
    let deleteCardUseCases: DeleteCardUseCases

    beforeEach(() => {
        cardRepository = new InMemoryCardRepository()
        deleteCardUseCases = new DeleteCardUseCases(
            new LoggerInMemory(),
            new ExceptionsInMemory(),
            cardRepository,
        )
    })

    it('should be able to delete a card', async () => {
        const cardTobeDeleted = cardsMocked[0]
        await cardRepository.insert(cardTobeDeleted)
        await deleteCardUseCases.execute(
            cardTobeDeleted.getProps().id,
            playerMocked.getProps().id
        )
        const card = await cardRepository.findById(cardTobeDeleted.getProps().id)
        expect(card).toBeUndefined()
    })

    it('should throw an error if card is not found', async () => {
        const cardTobeDeleted = cardsMocked[0]
        expect(async () => {
            return deleteCardUseCases.execute(
                cardTobeDeleted.getProps().id,
                playerMocked.getProps().id
            )
        })
            .rejects
            .toThrowError('Card not found')
    })

    it('should throw an error if an player is trying to delete a card that does not belong to him', async () => {
        const cardTobeDeleted = cardsMocked[0]
        await cardRepository.insert(cardTobeDeleted)
        expect(async () => {
            return deleteCardUseCases.execute(
                cardTobeDeleted.getProps().id,
                playerMocked2.getProps().id
            )
        })
            .rejects
            .toThrowError('You cant perform actions on this card')
    })
})