import { DynamicModule, Module } from '@nestjs/common';
import { AddCardUseCases } from 'src/app/useCases/card/addCard.useCase';
import { DeleteCardUseCases } from 'src/app/useCases/card/deleteCard.useCase';
import { GetCardUseCases } from 'src/app/useCases/card/getCard.useCase';
import { GetCardsUseCases } from 'src/app/useCases/card/getCards.useCase';
import { UpdateCardUseCases } from 'src/app/useCases/card/updateCard.useCase';
import { IException } from 'src/domain/expections/exceptions.interface';
import { ExceptionsModule } from 'src/infra/exceptions/exceptions.module';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { LoggerModule } from 'src/infra/logger/logger.module';
import { LoggerService } from 'src/infra/logger/logger.service';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { DatabaseCardRepository } from 'src/infra/repositories/cardRepository.database';
import { UseCaseProxy } from '../useCases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class CardUsecasesProxyModule {
  static GET_CARD_USECASES_PROXY = 'getCardUsecasesProxy';
  static GET_CARDS_USECASES_PROXY = 'getCardsUsecasesProxy';
  static POST_CARD_USECASES_PROXY = 'postCardUsecasesProxy';
  static DELETE_CARD_USECASES_PROXY = 'deleteCardUsecasesProxy';
  static PUT_CARD_USECASES_PROXY = 'putCardUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: CardUsecasesProxyModule,
      providers: [
        {
          inject: [ExceptionsService,DatabaseCardRepository],
          provide: CardUsecasesProxyModule.GET_CARD_USECASES_PROXY,
          useFactory: (exception: IException, cardRepository: DatabaseCardRepository) => new UseCaseProxy(new GetCardUseCases(exception,cardRepository)),
        },
        {
          inject: [DatabaseCardRepository],
          provide: CardUsecasesProxyModule.GET_CARDS_USECASES_PROXY,
          useFactory: (cardRepository: DatabaseCardRepository) =>
            new UseCaseProxy(new GetCardsUseCases(cardRepository)),
        },
        {
          inject: [LoggerService, DatabaseCardRepository],
          provide: CardUsecasesProxyModule.POST_CARD_USECASES_PROXY,
          useFactory: (logger: LoggerService, cardRepository: DatabaseCardRepository) =>
            new UseCaseProxy(new AddCardUseCases(logger, cardRepository)),
        },
        {
          inject: [ExceptionsService ,LoggerService, DatabaseCardRepository],
          provide: CardUsecasesProxyModule.PUT_CARD_USECASES_PROXY,
          useFactory: (exception: IException, logger: LoggerService, cardRepository: DatabaseCardRepository) =>
            new UseCaseProxy(new UpdateCardUseCases(exception, logger, cardRepository)),
        },
        {
          inject: [ExceptionsService,LoggerService, DatabaseCardRepository],
          provide: CardUsecasesProxyModule.DELETE_CARD_USECASES_PROXY,
          useFactory: (exception: IException,logger: LoggerService, cardRepository: DatabaseCardRepository) =>
            new UseCaseProxy(new DeleteCardUseCases(logger, exception, cardRepository)),
        },
      ],
      exports: [
        CardUsecasesProxyModule.GET_CARD_USECASES_PROXY,
        CardUsecasesProxyModule.GET_CARDS_USECASES_PROXY,
        CardUsecasesProxyModule.POST_CARD_USECASES_PROXY,
        CardUsecasesProxyModule.PUT_CARD_USECASES_PROXY,
        CardUsecasesProxyModule.DELETE_CARD_USECASES_PROXY,
      ],
    };
  }
}