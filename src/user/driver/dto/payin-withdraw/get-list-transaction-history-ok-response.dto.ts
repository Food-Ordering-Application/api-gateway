import { ApiProperty } from '@nestjs/swagger';
import { IDriverTransactions } from '../../interfaces';

export class GetListDriverTransactionHistoryOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'List transaction histories fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {},
    type: 'string',
  })
  data: IDriverTransactions;
}
