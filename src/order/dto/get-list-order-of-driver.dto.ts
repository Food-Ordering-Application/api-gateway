import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EDriverOrderType } from '../enums';

export class GetListOrderOfDriverDto {
  @ApiProperty({
    example: EDriverOrderType.ACTIVE,
    enum: EDriverOrderType,
    required: true,
  })
  @IsString()
  query: string;
}
