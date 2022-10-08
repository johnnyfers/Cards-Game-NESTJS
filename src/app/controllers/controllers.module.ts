import { Module } from '@nestjs/common';
import { CardUsecasesProxyModule } from 'src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module';
import { CardController } from './card/card.controller';


@Module({
  imports: [CardUsecasesProxyModule.register()],
  controllers: [CardController],
})
export class ControllersModule {}