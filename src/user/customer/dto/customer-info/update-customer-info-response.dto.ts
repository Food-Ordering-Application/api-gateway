import { ApiProperty } from '@nestjs/swagger';
import { IUpdateCustomerInfoData } from '../../interfaces';

export class UpdateCustomerInfoResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Customer updated successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IUpdateCustomerInfoData;
}
