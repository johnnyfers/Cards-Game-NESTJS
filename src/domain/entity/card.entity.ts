import { randomUUID } from "crypto"
import { PlayerProps } from "./player.entity"

export type CardLanguage = 'JAPONESE' | 'ENGLISH' | 'PORTUGUESE'

export interface CardProps {
  id?: string
  name: string
  language: CardLanguage
  foil: boolean
  priceBRL: number
  similarCardsAmount?: number

  playerId: string
  player?: PlayerProps
}

export class Card {

  constructor(private props: CardProps) {
    if (!props.id) randomUUID()
    this.props = props
  }

  getProps(): CardProps {
    return this.props
  }
}