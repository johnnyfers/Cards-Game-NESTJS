import { InMemoryCardRepository } from "src/infra/gateways/repositories/inmemory/cardRepository.inmemory"
import { AddCardUseCases } from "src/app/useCases/card/addCard.useCase"
import { LoggerInMemory } from "src/infra/gateways/logger/logger.inmemory"
import { TranslationAPIInMemory } from "src/infra/gateways/translateAPI/translateAPI.inmemory"

describe('AddCardUseCases', () => {
    let cardRepository: InMemoryCardRepository
    let addCardUseCases: AddCardUseCases

    beforeEach(() => {
        cardRepository = new InMemoryCardRepository()
        addCardUseCases = new AddCardUseCases(
            new LoggerInMemory(),
            cardRepository,
            new TranslationAPIInMemory()
        )
    })

    it('should be able to add a new card', async() => {
        const payload = {
            name: "new card",
            edition: "new edition",
            language: "PORTUGUESE",
            foil: false,
            priceBRL: 100
        }
        const card = await addCardUseCases.execute(payload,'playerID')
        const cProps = card.getProps()
        
        expect(cProps.id).toBeDefined()
        expect(cProps.name).toBe(payload.name)
        expect(cProps.language).toBe(payload.language)
        expect(cProps.foil).toBe(payload.foil)
        expect(cProps.priceBRL).toBe(payload.priceBRL)
        expect(cProps.edition).toBe(payload.edition)
    })
})