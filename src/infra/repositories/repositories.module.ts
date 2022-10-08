import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '../prisma/prisma-service/prisma-service.module';
import { DatabaseCardRepository } from './cardRepository.database';
import { PlayerRepositoryDatabase } from './playerRepository.database';


@Module({
  imports: [PrismaServiceModule],
    providers: [DatabaseCardRepository, PlayerRepositoryDatabase],
    exports: [DatabaseCardRepository, PlayerRepositoryDatabase],
  })
  export class RepositoriesModule {}