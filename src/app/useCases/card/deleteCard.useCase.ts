import { ILogger } from "src/domain/logger/logger.interface";
import { CardRepository } from "src/domain/repositories/cardRepository.interface";


export class DeleteCardUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly cardRepository: CardRepository
    ) { }

    async execute(id: string) {
        await this.cardRepository.deleteById(id)
        this.logger.log('deleteCardUseCases execute', `Card ${id} have been deleted`);
    }
}
