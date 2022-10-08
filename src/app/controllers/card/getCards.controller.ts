import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CardPresenter } from "src/app/presenters/card.presenter";
import { GetCardsUseCases } from "src/app/useCases/card/getCards.useCase";
import { UserFromJwt } from "src/domain/abstraction/auth/UserFromJwt.interface";
import { CurrentUser } from "src/infra/auth/decorators/currentUser.decorator";
import { ApiResponseType } from 'src/infra/gateways/common/swagger/response.decorator';
import { CardUsecasesProxyModule } from "src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module";
import { UseCaseProxy } from "src/infra/use-case-proxies/useCases-proxy";

@Controller('card')
@ApiTags('card')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CardPresenter)
export class GetCardsController {
  constructor(
    @Inject(CardUsecasesProxyModule.GET_CARDS_USECASES_PROXY)
    private readonly getAllCardUsecaseProxy: UseCaseProxy<GetCardsUseCases>,
  ) { }

  @Get('list')
  @ApiResponseType(CardPresenter, true)
  async getCards(
    @CurrentUser('player') player: UserFromJwt,
    @Query('name') name: string
  ) {
    const cards = await this.getAllCardUsecaseProxy.getInstance().execute(name, player.id);
    return cards.map((card) => new CardPresenter(card));
  }
}