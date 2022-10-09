import { PartialCardDto } from 'src/app/dto/card.dto';
import { Card } from 'src/domain/entity/card.entity';
import { IException } from 'src/domain/abstraction/expections/exceptions.interface';
import { ILogger } from 'src/domain/abstraction/logger/logger.interface';
import { CardRepository } from 'src/domain/abstraction/repositories/cardRepository.interface';
import { TranslationAPI } from 'src/domain/abstraction/translateAPI/translationAPI.interface';
import { CardInvariant } from 'src/domain/services/invariants/cardInvariant';

export class UpdateCardUseCases {
  constructor(
    private readonly exception: IException,
    private readonly logger: ILogger,
    private readonly cardRepository: CardRepository,
    private readonly translationAPI: TranslationAPI,
  ) { }

  async execute(
    updateCardDto: PartialCardDto,
    id: string,
    playerId: string,
  ): Promise<void> {
    const card = await this.cardRepository.findById(id);
    const cardInvariant = new CardInvariant(this.exception)
    cardInvariant.handle(card, playerId)
    let translatedName: string = card.getProps().name;
    if (updateCardDto?.name) {
      translatedName = await this.translationAPI.translate(
        updateCardDto.name,
        'pt',
      );
    }
    const newCard = new Card({
      ...card.getProps(),
      ...updateCardDto,
      name: translatedName,
    });
    await this.cardRepository.updateContent(id, newCard);
    this.logger.log(
      'updateCardUseCases execute',
      `Card ${id} have been updated`,
    );
  }
}
