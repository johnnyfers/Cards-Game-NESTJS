import { CardLanguage } from "src/domain/entity/card.entity"


export class UpdateCardDto {

}

export class AddCardDto {
    id?: string
    name: string
    language: CardLanguage
    foil: boolean
    priceBRL: number
}