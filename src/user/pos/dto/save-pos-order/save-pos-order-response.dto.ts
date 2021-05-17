import { ApiProperty } from '@nestjs/swagger';
import { ISavePosOrderData } from '../../interfaces';
import { SavePosOrderExample } from './save-pos-order-response.example';

export class SavePosOrderResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Save order successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      SavePosOrderExample,
    },
    nullable: true,
  })
  data: ISavePosOrderData;
}
