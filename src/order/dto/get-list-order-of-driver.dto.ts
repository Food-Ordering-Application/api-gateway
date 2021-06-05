import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max } from 'class-validator';
import { EDriverOrderType } from '../enums';

export class GetListOrderOfDriverDto {
  @ApiProperty({
    example: EDriverOrderType.ACTIVE,
    enum: EDriverOrderType,
    required: true,
  })
  @IsString()
  query: string;

  @ApiProperty({ example: 2, required: true })
  @IsInt()
  page: number;

  @ApiProperty({ example: 25, required: true })
  @IsInt()
  @Max(25)
  size: number;
}
