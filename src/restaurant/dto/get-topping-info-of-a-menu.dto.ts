import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetToppingInfoOfAMenuDto {
  @ApiProperty({
    example: '6c94e9b7-aa4f-44c8-bf21-91dd1da2dc2d',
    required: true,
  })
  @IsString()
  menuId?: string;
}
