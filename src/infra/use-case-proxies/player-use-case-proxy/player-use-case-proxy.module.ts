import { DynamicModule, Module } from '@nestjs/common';
import { AddPlayerUseCase } from 'src/app/useCases/player/addPlayer.usecase';
import { AuthPlayerUseCase } from 'src/app/useCases/player/authPlayer.usecase';
import { AuthModule } from 'src/infra/auth/auth.module';
import { JWTAuth } from 'src/infra/auth/jwt.auth';
import { ExceptionsModule } from 'src/infra/gateways/exceptions/exceptions.module';
import { ExceptionsService } from 'src/infra/gateways/exceptions/exceptions.service';
import { LoggerModule } from 'src/infra/gateways/logger/logger.module';
import { LoggerService } from 'src/infra/gateways/logger/logger.service';
import { DatabasePlayerRepository } from 'src/infra/gateways/repositories/playerRepository.database';
import { RepositoriesModule } from 'src/infra/gateways/repositories/repositories.module';
import { UseCaseProxy } from '../useCases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule, AuthModule,],
})
export class PlayerUsecasesProxyModule {
  static POST_PLAYER_USECASES_PROXY = 'postPlayerUsecasesProxy';
  static AUTH_PLAYER_USECASES_PROXY = 'authPlayerUseCasesProxy';

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
        {
          inject: [LoggerService, ExceptionsService, DatabasePlayerRepository, JWTAuth],
          provide: PlayerUsecasesProxyModule.AUTH_PLAYER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            exceptions: ExceptionsService,
            playerRepository: DatabasePlayerRepository,
            jwt: JWTAuth,
          ) =>
            new UseCaseProxy(new AuthPlayerUseCase(logger, exceptions, playerRepository, jwt)),
        },
      ],
      exports: [
        PlayerUsecasesProxyModule.POST_PLAYER_USECASES_PROXY,
        PlayerUsecasesProxyModule.AUTH_PLAYER_USECASES_PROXY,
      ],
    };
  }
}