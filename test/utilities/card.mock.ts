import { randomBytes } from 'crypto';
import { Card } from "src/domain/entity/card.entity"
import { playerMocked, playerMocked2 } from "test/utilities/player.mock"

export const cardsMocked: Card[] = []

for (let i = 0; i < 10; i++) {
    cardsMocked.push(new Card({
        edition: randomBytes(10).toString('hex'),
        foil: true,
        language: 'ENGLISH',
        name: randomBytes(10).toString('hex'),
        playerId: playerMocked.getProps().id,
        priceBRL: i,
    }))
}

for (let i = 0; i < 10; i++) {
    cardsMocked.push(new Card({
        edition: randomBytes(10).toString('hex'),
        foil: true,
        language: 'PORTUGUESE',
        name: randomBytes(10).toString('hex'),
        playerId: playerMocked2.getProps().id,
        priceBRL: i,
    }))
}