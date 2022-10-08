import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddCardDto } from "src/app/dto/card.dto";
import { CardPresenter } from "src/app/presenters/card.presenter";
import { AddCardUseCases } from "src/app/useCases/card/addCard.useCase";
import { ApiResponseType } from "src/infra/common/swagger/response.decorator";
import { CardUsecasesProxyModule } from "src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module";
import { UseCaseProxy } from "src/infra/use-case-proxies/useCases-proxy";

@Controller('card')
@ApiTags('card')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CardPresenter)
export class AddCardController {
    constructor(
        @Inject(CardUsecasesProxyModule.POST_CARD_USECASES_PROXY)
        private readonly addCardUsecaseProxy: UseCaseProxy<AddCardUseCases>,
    ) { }

    @Post('create')
    @ApiResponseType(CardPresenter, true)
    async addCard(@Body() addCardDto: AddCardDto) {
      const cardCreated = await this.addCardUsecaseProxy.getInstance().execute(addCardDto,'');
      return new CardPresenter(cardCreated);
    }
}