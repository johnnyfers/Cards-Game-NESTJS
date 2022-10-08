import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service.service';

@Module({
    exports: [PrismaService],
    providers: [PrismaService]
})
export class PrismaServiceModule {}
