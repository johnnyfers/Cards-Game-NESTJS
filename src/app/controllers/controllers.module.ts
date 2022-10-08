import { Module } from '@nestjs/common';
import { CardUsecasesProxyModule } from 'src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module';
import { PlayerUsecasesProxyModule } from 'src/infra/use-case-proxies/player-use-case-proxy/player-use-case-proxy.module';
import { AddCardController } from './card/addCard.controller';
import { DeleteCardController } from './card/deleteCard.controller';
import { GetCardController } from './card/getCard.controller';
import { GetCardsController } from './card/getCards.controller';
import { UpdateCardController } from './card/updateCard.controller';
import { AddPlayerController } from './player/addPlayer.controller';
import { AuthPlayerController } from './player/authPlayer.controller';


@Module({
  imports: [
    CardUsecasesProxyModule.register(),
    PlayerUsecasesProxyModule.register()
  ],
  controllers: [
    AddPlayerController,
    GetCardController,
    GetCardsController,
    UpdateCardController,
    DeleteCardController,
    AddCardController,
    AuthPlayerController
  ],
})
export class ControllersModule {}