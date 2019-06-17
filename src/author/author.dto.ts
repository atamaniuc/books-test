import { ApiModelProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthorDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiModelProperty()
  @IsDateString()
  @IsNotEmpty()
  birthday: Date;
}
