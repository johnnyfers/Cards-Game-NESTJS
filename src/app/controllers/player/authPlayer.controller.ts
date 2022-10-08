import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddPlayerDto } from 'src/app/dto/player.dto';
import { CardPresenter } from 'src/app/presenters/card.presenter';
import { PlayerPresenter } from 'src/app/presenters/player.presenter';
import { AuthPlayerUseCase } from 'src/app/useCases/player/authPlayer.usecase';
import { IsPublic } from 'src/infra/auth/decorators/isPublic.decorator';
import { ApiResponseType } from 'src/infra/common/swagger/response.decorator';
import { PlayerUsecasesProxyModule } from 'src/infra/use-case-proxies/player-use-case-proxy/player-use-case-proxy.module';
import { UseCaseProxy } from 'src/infra/use-case-proxies/useCases-proxy';

@Controller('player')
@ApiTags('player')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PlayerPresenter)
export class AuthPlayerController {
    constructor(
        @Inject(PlayerUsecasesProxyModule.AUTH_PLAYER_USECASES_PROXY)
        private readonly authPlayerUsecaseProxy: UseCaseProxy<AuthPlayerUseCase>,
    ) { }

    @IsPublic()
    @Post('auth')
    @ApiResponseType(CardPresenter, true)
    async auth(@Body() { username, password }: AddPlayerDto) {
        const { player, token } = await this.authPlayerUsecaseProxy.getInstance().execute({ username, password });
        return {
            player: new PlayerPresenter(player),
            token
        };
    }
}