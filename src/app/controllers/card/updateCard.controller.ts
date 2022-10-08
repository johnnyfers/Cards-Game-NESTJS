import { Body, Controller, Inject, Put, Query } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PartialCardDto } from "src/app/dto/card.dto";
import { CardPresenter } from "src/app/presenters/card.presenter";
import { UpdateCardUseCases } from "src/app/useCases/card/updateCard.useCase";
import { UserFromJwt } from "src/domain/abstraction/auth/UserFromJwt.interface";
import { CurrentUser } from "src/infra/auth/decorators/currentUser.decorator";
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
    async updateCard(
        @CurrentUser('player') player: UserFromJwt,
        @Query('id') id: string, @Body() { foil, language, name, priceBRL, edition }: PartialCardDto) {
        await this.updateCardUsecaseProxy.getInstance().execute({ foil, language, name, priceBRL, edition }, id, player.id);
        return 'success';
    }
}