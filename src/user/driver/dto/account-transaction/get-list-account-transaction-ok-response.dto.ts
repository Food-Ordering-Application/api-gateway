import { ApiProperty } from '@nestjs/swagger';
import { IAccountTransactions } from '../../interfaces';

export class GetListAccountTransactionDriverOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'List account transactions fetched successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      accountTransactions: [
        {
          id: '123',
          amount: '123',
          accountBalance: '123',
          operationType: 'SYSTEM_ADD',
          createdAt: 'date',
        },
      ],
    },
    type: 'string',
  })
  data: IAccountTransactions;
}
