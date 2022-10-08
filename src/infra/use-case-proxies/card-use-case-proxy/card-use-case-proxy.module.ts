import { DynamicModule, Module } from '@nestjs/common';
import { AddCardUseCases } from 'src/app/useCases/card/addCard.useCase';
import { DeleteCardUseCases } from 'src/app/useCases/card/deleteCard.useCase';
import { GetCardsUseCases } from 'src/app/useCases/card/getCards.useCase';
import { UpdateCardUseCases } from 'src/app/useCases/card/updateCard.useCase';
import { IException } from 'src/domain/abstraction/expections/exceptions.interface';
import { ExceptionsModule } from 'src/infra/gateways/exceptions/exceptions.module';
import { ExceptionsService } from 'src/infra/gateways/exceptions/exceptions.service';
import { LoggerModule } from 'src/infra/gateways/logger/logger.module';
import { LoggerService } from 'src/infra/gateways/logger/logger.service';
import { RepositoriesModule } from 'src/infra/gateways/repositories/repositories.module';
import { DatabaseCardRepository } from 'src/infra/gateways/repositories/cardRepository.database';
import { UseCaseProxy } from '../useCases-proxy';
import { TranslationAPIGoogleCloud } from 'src/infra/gateways/translateAPI/translationAPI.googlecloud';
import { TranslationAPIModule } from 'src/infra/gateways/translateAPI/translationAPI.module';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule, TranslationAPIModule],
})
export class CardUsecasesProxyModule {
  static GET_CARDS_USECASES_PROXY = 'getCardsUsecasesProxy';
  static POST_CARD_USECASES_PROXY = 'postCardUsecasesProxy';
  static DELETE_CARD_USECASES_PROXY = 'deleteCardUsecasesProxy';
  static PUT_CARD_USECASES_PROXY = 'putCardUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: CardUsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseCardRepository],
          provide: CardUsecasesProxyModule.GET_CARDS_USECASES_PROXY,
          useFactory: (cardRepository: DatabaseCardRepository) =>
            new UseCaseProxy(new GetCardsUseCases(cardRepository)),
        },
        {
          inject: [LoggerService, DatabaseCardRepository, TranslationAPIGoogleCloud],
          provide: CardUsecasesProxyModule.POST_CARD_USECASES_PROXY,
          useFactory: (logger: LoggerService, cardRepository: DatabaseCardRepository, translationAPI: TranslationAPIGoogleCloud) =>
            new UseCaseProxy(new AddCardUseCases(logger, cardRepository, translationAPI)),
        },
        {
          inject: [ExceptionsService ,LoggerService, DatabaseCardRepository, TranslationAPIGoogleCloud],
          provide: CardUsecasesProxyModule.PUT_CARD_USECASES_PROXY,
          useFactory: (exception: IException, logger: LoggerService, cardRepository: DatabaseCardRepository, translationAPI: TranslationAPIGoogleCloud) =>
            new UseCaseProxy(new UpdateCardUseCases(exception, logger, cardRepository, translationAPI)),
        },
        {
          inject: [ExceptionsService,LoggerService, DatabaseCardRepository],
          provide: CardUsecasesProxyModule.DELETE_CARD_USECASES_PROXY,
          useFactory: (exception: IException,logger: LoggerService, cardRepository: DatabaseCardRepository) =>
            new UseCaseProxy(new DeleteCardUseCases(logger, exception, cardRepository)),
        },
      ],
      exports: [
        CardUsecasesProxyModule.GET_CARDS_USECASES_PROXY,
        CardUsecasesProxyModule.POST_CARD_USECASES_PROXY,
        CardUsecasesProxyModule.PUT_CARD_USECASES_PROXY,
        CardUsecasesProxyModule.DELETE_CARD_USECASES_PROXY,
      ],
    };
  }
}