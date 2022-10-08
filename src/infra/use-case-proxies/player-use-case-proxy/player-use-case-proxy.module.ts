import { DynamicModule, Module } from '@nestjs/common';
import { AddPlayerUseCase } from 'src/app/useCases/player/addPlayer.usecase';
import { ExceptionsModule } from 'src/infra/exceptions/exceptions.module';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { LoggerModule } from 'src/infra/logger/logger.module';
import { LoggerService } from 'src/infra/logger/logger.service';
import { DatabasePlayerRepository } from 'src/infra/repositories/playerRepository.database';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { UseCaseProxy } from '../useCases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class PlayerUsecasesProxyModule {
  static POST_PLAYER_USECASES_PROXY = 'postPlayerUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: PlayerUsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, ExceptionsService, DatabasePlayerRepository],
          provide: PlayerUsecasesProxyModule.POST_PLAYER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            exceptions: ExceptionsService,
            playerRepository: DatabasePlayerRepository
          ) =>
            new UseCaseProxy(new AddPlayerUseCase(logger, exceptions, playerRepository)),
        },
      ],
      exports: [
        PlayerUsecasesProxyModule.POST_PLAYER_USECASES_PROXY,
      ],
    };
  }
}