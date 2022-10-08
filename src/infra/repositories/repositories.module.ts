import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '../prisma/prisma-service/prisma-service.module';
import { DatabaseCardRepository } from './cardRepository.database';
import { DatabasePlayerRepository } from './playerRepository.database';


@Module({
  imports: [PrismaServiceModule],
    providers: [DatabaseCardRepository, DatabasePlayerRepository],
    exports: [DatabaseCardRepository, DatabasePlayerRepository],
  })
  export class RepositoriesModule {}