import { InMemoryCardRepository } from "src/infra/gateways/repositories/inmemory/cardRepository.inmemory"
import { playerMocked, playerMocked2 } from '../../utilities/player.mock'
import { cardsMocked } from '../../utilities/card.mock'
import { GetCardsUseCases } from "src/app/useCases/card/getCards.useCase"

describe('getCardsUseCases', () => {
    let cardRepository: InMemoryCardRepository
    let getCardsUseCases: GetCardsUseCases

    beforeEach(() => {
        cardRepository = new InMemoryCardRepository()
        getCardsUseCases = new GetCardsUseCases(
            cardRepository,
        )
    })

    it('should be able to get cards from a player', async () => {
        cardRepository.cards.push(...cardsMocked)
        const playerMockedCards = await getCardsUseCases.execute(playerMocked.getProps().id)
        const playerMocked2Cards = await getCardsUseCases.execute(playerMocked2.getProps().id)

        expect(playerMockedCards).toHaveLength(10)
        expect(playerMocked2Cards).toHaveLength(10)
        expect(playerMockedCards.every(card => card.getProps().playerId === playerMocked.getProps().id))
        expect(playerMocked2Cards.every(card => card.getProps().playerId === playerMocked2.getProps().id))
    })

    it('should be able to get cards from a player filtering by given name', async () => {
        cardRepository.cards.push(...cardsMocked)
        const cardToBeSelected = cardsMocked[0]
        const playerMockedCards = await getCardsUseCases.execute(
            playerMocked.getProps().id,
            cardToBeSelected.getProps().name
        )
        expect(playerMockedCards[0]).toBe(cardToBeSelected)
    })
})