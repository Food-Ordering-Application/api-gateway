import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderItemQuantityDto {
  @ApiProperty({
    example: '50e26c95-383b-4cb2-a97c-1547433c6d3a',
    required: true,
  })
  @IsString()
  orderItemId: string;

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNumber()
  quantity: number;
}