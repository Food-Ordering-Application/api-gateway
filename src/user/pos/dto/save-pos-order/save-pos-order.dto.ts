import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PosOrderDto } from './pos-order.dto';
import { orderExampleData } from './save-pos-order-response.example';
export class SavePosOrderDto {
  @ApiProperty({
    example: orderExampleData,
    required: true,
  })
  @ValidateNested()
  @Type(() => PosOrderDto)
  order: PosOrderDto;
}
