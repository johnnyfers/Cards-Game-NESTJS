import { Controller, Delete, Inject, Query } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CardPresenter } from "src/app/presenters/card.presenter";
import { DeleteCardUseCases } from "src/app/useCases/card/deleteCard.useCase";
import { ApiResponseType } from "src/infra/common/swagger/response.decorator";
import { CardUsecasesProxyModule } from "src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module";
import { UseCaseProxy } from "src/infra/use-case-proxies/useCases-proxy";

@Controller('card')
@ApiTags('card')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CardPresenter)
export class DeleteCardController {
    constructor(
        @Inject(CardUsecasesProxyModule.DELETE_CARD_USECASES_PROXY)
        private readonly deleteCardUsecaseProxy: UseCaseProxy<DeleteCardUseCases>,
    ) { }

    @Delete('delete')
    @ApiResponseType(CardPresenter, true)
    async deleteCard(@Query('id') id: string) {
        await this.deleteCardUsecaseProxy.getInstance().execute(id);
        return 'success';
    }
}