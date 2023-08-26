import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MarkerDto {
  @IsNotEmpty()
  @IsNumber()
  readonly lat: number;

  @IsNotEmpty()
  @IsNumber()
  readonly lng: number;
}

export class CreateRouteDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(160)
  readonly shortDescription: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly length: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MarkerDto)
  readonly markers: MarkerDto[];

  readonly favorited: boolean;
}
