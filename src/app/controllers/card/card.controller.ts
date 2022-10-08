import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddCardDto, UpdateCardDto } from 'src/app/dto/card.dto';
import { CardPresenter } from 'src/app/presenters/card.presenter';
import { AddCardUseCases } from 'src/app/useCases/card/addCard.useCase';
import { DeleteCardUseCases } from 'src/app/useCases/card/deleteCard.useCase';
import { GetCardUseCases } from 'src/app/useCases/card/getCard.useCase';
import { GetCardsUseCases } from 'src/app/useCases/card/getCards.useCase';
import { UpdateCardUseCases } from 'src/app/useCases/card/updateCard.useCase';
import { ApiResponseType } from 'src/infra/common/swagger/response.decorator';
import { CardUsecasesProxyModule } from 'src/infra/use-case-proxies/card-use-case-proxy/card-use-case-proxy.module';
import { UseCaseProxy } from 'src/infra/use-case-proxies/useCases-proxy';

@Controller('card')
@ApiTags('card')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CardPresenter)
export class CardController {
  constructor(
    @Inject(CardUsecasesProxyModule.GET_TODO_USECASES_PROXY)
    private readonly getCardUsecaseProxy: UseCaseProxy<GetCardUseCases>,
    @Inject(CardUsecasesProxyModule.GET_TODOS_USECASES_PROXY)
    private readonly getAllCardUsecaseProxy: UseCaseProxy<GetCardsUseCases>,
    @Inject(CardUsecasesProxyModule.PUT_TODO_USECASES_PROXY)
    private readonly updateCardUsecaseProxy: UseCaseProxy<UpdateCardUseCases>,
    @Inject(CardUsecasesProxyModule.DELETE_TODO_USECASES_PROXY)
    private readonly deleteCardUsecaseProxy: UseCaseProxy<DeleteCardUseCases>,
    @Inject(CardUsecasesProxyModule.POST_TODO_USECASES_PROXY)
    private readonly addCardUsecaseProxy: UseCaseProxy<AddCardUseCases>,
  ) {}

  @Get('show')
  @ApiResponseType(CardPresenter, false)
  async getCard(@Query('id', ParseIntPipe) id: number) {
    const card = await this.getCardUsecaseProxy.getInstance().execute(id);
    return new CardPresenter(card);
  }

  @Get('list/all')
  @ApiResponseType(CardPresenter, true)
  async getCards() {
    const cards = await this.getAllCardUsecaseProxy.getInstance().execute();
    return cards.map((card) => new CardPresenter(card));
  }

  @Put('update')
  @ApiResponseType(CardPresenter, true)
  async updateCard(@Body() updateCardDto: UpdateCardDto) {
    await this.updateCardUsecaseProxy.getInstance().execute(updateCardDto);
    return 'success';
  }

  @Delete('delete')
  @ApiResponseType(CardPresenter, true)
  async deleteCard(@Query('id', ParseIntPipe) id: number) {
    await this.deleteCardUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('create')
  @ApiResponseType(CardPresenter, true)
  async addCard(@Body() addCardDto: AddCardDto) {
    const cardCreated = await this.addCardUsecaseProxy.getInstance().execute(addCardDto);
    return new CardPresenter(cardCreated);
  }
}