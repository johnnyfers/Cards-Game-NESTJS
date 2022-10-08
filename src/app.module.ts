import { Module } from '@nestjs/common';
import { LoggerModule } from './infra/gateways/logger/logger.module';
import { ExceptionsModule } from './infra/gateways/exceptions/exceptions.module';
import { ControllersModule } from './app/controllers/controllers.module';
import { PrismaService } from './infra/gateways/prisma/prisma-service/prisma-service.service';
import { CardUsecasesProxyModule } from './infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module';
import { PrismaServiceModule } from './infra/gateways/prisma/prisma-service/prisma-service.module';
import { RepositoriesModule } from './infra/gateways/repositories/repositories.module';
import { AuthModule } from './infra/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/auth/guards/jwtAuth.guard';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    CardUsecasesProxyModule,
    ControllersModule,
    PrismaServiceModule,
    RepositoriesModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService]
})

export class AppModule { }
