import { IException } from 'src/domain/abstraction/expections/exceptions.interface';
import { ILogger } from 'src/domain/abstraction/logger/logger.interface';
import { CardRepository } from 'src/domain/abstraction/repositories/cardRepository.interface';

export class DeleteCardUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly exception: IException,
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(id: string, playerId: string) {
    const cardExists = await this.cardRepository.findById(id);
    if (!cardExists) {
      throw this.exception.badRequestException({
        message: 'Card not found',
      });
    }
    const { playerId: cardPlayerId } = cardExists.getProps();
    if (cardPlayerId !== playerId) {
      throw this.exception.forbiddenException();
    }
    await this.cardRepository.deleteById(id);
    this.logger.log(
      'deleteCardUseCases execute',
      `Card ${id} have been deleted`,
    );
  }
}
