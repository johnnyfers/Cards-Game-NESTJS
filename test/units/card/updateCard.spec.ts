import { InMemoryCardRepository } from "src/infra/gateways/repositories/inmemory/cardRepository.inmemory"
import { LoggerInMemory } from "src/infra/gateways/logger/logger.inmemory"
import { ExceptionsInMemory } from "src/infra/gateways/exceptions/exceptions.inmemory"
import { playerMocked, playerMocked2 } from '../../utilities/player.mock'
import { cardsMocked } from '../../utilities/card.mock'
import { UpdateCardUseCases } from "src/app/useCases/card/updateCard.useCase"
import { TranslationAPIInMemory } from "src/infra/gateways/translateAPI/translateAPI.inmemory"

describe('UpdateCardUseCases', () => {
    let cardRepository: InMemoryCardRepository
    let updateCardUseCases: UpdateCardUseCases

    beforeEach(() => {
        cardRepository = new InMemoryCardRepository()
        updateCardUseCases = new UpdateCardUseCases(
            new ExceptionsInMemory(),
            new LoggerInMemory(),
            cardRepository,
            new TranslationAPIInMemory()
        )
    })

    it('should be able to update a card', async () => {
        const payload = {
            name: "new card",
            edition: "new edition",
            language: "PORTUGUESE",
            foil: false,
            priceBRL: 100
        }
        const cardTobeUpdated = cardsMocked[0]
        await cardRepository.insert(cardTobeUpdated)
        await updateCardUseCases.execute(
            payload,
            cardTobeUpdated.getProps().id,
            playerMocked.getProps().id
        )
        const card = await cardRepository.findById(cardTobeUpdated.getProps().id)
        const cProps = card.getProps()
        
        expect(cProps.id).toBe(cardTobeUpdated.getProps().id)
        expect(cProps.name).toBe(payload.name)
        expect(cProps.language).toBe(payload.language)
        expect(cProps.foil).toBe(payload.foil)
        expect(cProps.priceBRL).toBe(payload.priceBRL)
        expect(cProps.edition).toBe(payload.edition)
    })

    it('should throw an error if card is not found', async () => {
        const payload = {
            name: "new card",
            edition: "new edition",
            language: "PORTUGUESE",
            foil: false,
            priceBRL: 100
        }
        const cardTobeUpdated = cardsMocked[0]
        expect(async () => {
            return updateCardUseCases.execute(
                payload,
                cardTobeUpdated.getProps().id,
                playerMocked.getProps().id
            )
        })
            .rejects
            .toThrowError('Card not found')
    })

    it('should throw an error if an player is trying to update a card that does not belong to him', async () => {
        const payload = {
            name: "new card",
            edition: "new edition",
            language: "PORTUGUESE",
            foil: false,
            priceBRL: 100
        }
        const cardTobeUpdated = cardsMocked[0]
        await cardRepository.insert(cardTobeUpdated)
        expect(async () => {
            return updateCardUseCases.execute(
                payload,
                cardTobeUpdated.getProps().id,
                playerMocked2.getProps().id
            )
        })
            .rejects
            .toThrowError('You cant perform actions on this card')
    })
})