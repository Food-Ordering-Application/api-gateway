import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetDistrictsDto {
  @ApiProperty({ example: 5, required: true })
  @IsInt()
  cityId: number;
}
