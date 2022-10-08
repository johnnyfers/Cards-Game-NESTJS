import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { PrismaServiceModule } from '../prisma/prisma-service/prisma-service.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { RolesGuard } from './guards/roles.guard';
import { JWTAuth } from './jwt.auth';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    RepositoriesModule,
    PrismaServiceModule,
    ExceptionsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [],
  providers: [
    JWTAuth,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JWTAuth],
})
export class AuthModule {}
