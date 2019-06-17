import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class BookDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiModelProperty()
  @IsString()
  @Length(2, 128)
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsNotEmpty()
  authors: string[];

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  iban: string;

  @ApiModelProperty()
  @IsDateString()
  @IsNotEmpty()
  publishedAt: Date;
}
