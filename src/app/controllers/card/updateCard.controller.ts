import { Body, Controller, Inject, Put, Query } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateCardDto } from "src/app/dto/card.dto";
import { CardPresenter } from "src/app/presenters/card.presenter";
import { UpdateCardUseCases } from "src/app/useCases/card/updateCard.useCase";
import { ApiResponseType } from "src/infra/common/swagger/response.decorator";
import { CardUsecasesProxyModule } from "src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module";
import { UseCaseProxy } from "src/infra/use-case-proxies/useCases-proxy";

@Controller('card')
@ApiTags('card')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CardPresenter)
export class UpdateCardController {
    constructor(
        @Inject(CardUsecasesProxyModule.PUT_CARD_USECASES_PROXY)
        private readonly updateCardUsecaseProxy: UseCaseProxy<UpdateCardUseCases>,
    ) { }

    @Put('update')
    @ApiResponseType(CardPresenter, true)
    async updateCard(@Query('id') id: string, @Body() updateCardDto: UpdateCardDto) {
        await this.updateCardUsecaseProxy.getInstance().execute(updateCardDto, id);
        return 'success';
    }
}