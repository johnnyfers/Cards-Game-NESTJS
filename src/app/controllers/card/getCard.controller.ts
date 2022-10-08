import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CardPresenter } from "src/app/presenters/card.presenter";
import { GetCardUseCases } from "src/app/useCases/card/getCard.useCase";
import { ApiResponseType } from "src/infra/common/swagger/response.decorator";
import { CardUsecasesProxyModule } from "src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module";
import { UseCaseProxy } from "src/infra/use-case-proxies/useCases-proxy";

@Controller('card')
@ApiTags('card')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CardPresenter)
export class GetCardController {
  constructor(
    @Inject(CardUsecasesProxyModule.GET_CARD_USECASES_PROXY)
    private readonly getCardUsecaseProxy: UseCaseProxy<GetCardUseCases>,
  ) {}

  @Get('show')
  @ApiResponseType(CardPresenter, false)
  async getCard(@Query('id') id: string) {
    const card = await this.getCardUsecaseProxy.getInstance().execute(id);
    return new CardPresenter(card);
  }
}