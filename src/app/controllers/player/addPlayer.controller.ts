import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddPlayerDto } from 'src/app/dto/player.dto';
import { CardPresenter } from 'src/app/presenters/card.presenter';
import { PlayerPresenter } from 'src/app/presenters/player.presenter';
import { AddPlayerUseCase } from 'src/app/useCases/player/addPlayer.usecase';
import { IsPublic } from 'src/infra/auth/decorators/isPublic.decorator';
import { ApiResponseType } from 'src/infra/gateways/common/swagger/response.decorator';
import { PlayerUsecasesProxyModule } from 'src/infra/use-case-proxies/player-use-case-proxy/player-use-case-proxy.module';
import { UseCaseProxy } from 'src/infra/use-case-proxies/useCases-proxy';

@Controller('player')
@ApiTags('player')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PlayerPresenter)
export class AddPlayerController {
  constructor(
    @Inject(PlayerUsecasesProxyModule.POST_PLAYER_USECASES_PROXY)
    private readonly addPlayerUsecaseProxy: UseCaseProxy<AddPlayerUseCase>,
  ) {}

  @IsPublic()
  @Post('create')
  @ApiResponseType(CardPresenter, true)
  async addPlayer(@Body() addPlayerDto: AddPlayerDto) {
    const playerCreated = await this.addPlayerUsecaseProxy
      .getInstance()
      .execute(addPlayerDto);
    return new PlayerPresenter(playerCreated);
  }
}
