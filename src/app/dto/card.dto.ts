import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CardLanguage } from 'src/domain/entity/card.entity';

enum CardLanguageEnum {
  'JAPANESE',
  'ENGLISH',
  'PORTUGUESE',
}

export class CardDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  edition: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(CardLanguageEnum)
  language: CardLanguage | string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  foil: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  priceBRL: number;
}

export class PartialCardDto extends PartialType(CardDto) {}
