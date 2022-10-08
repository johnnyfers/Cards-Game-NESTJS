import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CardLanguage } from "src/domain/entity/card.entity"

enum CardLanguageEnum {
    'JAPONESE',
    'ENGLISH',
    'PORTUGUESE'
}

export class AddCardDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEnum(CardLanguageEnum)
    language: CardLanguage

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsBoolean()
    foil: boolean

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    priceBRL: number
}

export class UpdateCardDto extends PartialType(AddCardDto){}