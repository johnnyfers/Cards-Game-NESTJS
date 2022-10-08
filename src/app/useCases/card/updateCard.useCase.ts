import { UpdateCardDto } from "src/app/dto/card.dto";
import { Card } from "src/domain/entity/card.entity";
import { IException } from "src/domain/expections/exceptions.interface";
import { ILogger } from "src/domain/logger/logger.interface";
import { CardRepository } from "src/domain/repositories/cardRepository.interface";

export class UpdateCardUseCases {
    constructor(
        private readonly exception: IException,
        private readonly logger: ILogger,
        private readonly cardRepository: CardRepository
    ) { }

    async execute(updateCardDto: UpdateCardDto, id: string): Promise<void> {
        const card = await this.cardRepository.findById(id)
        if (!card) throw this.exception.badRequestException({
            message: 'Card not found',
            code_error: 404
        })
        const newCard = new Card({
            ...card.getProps(),
            ...updateCardDto
        })
        await this.cardRepository.updateContent(id, newCard)
        this.logger.log('updateCardUseCases execute', `Card ${id} have been updated`)
    }
}
