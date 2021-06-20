import { ApiProperty } from '@nestjs/swagger';
import { IDriverDailyStatisticData } from '../../interfaces';

export class GetDriverDailyStatisticOkResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get daily statistic successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      statistic: {
        date: '2021-06-20T09:02:23Z',
        income: 1234,
        numOrderFinished: 5,
        commission: 123,
      },
    },
    type: 'string',
  })
  data: IDriverDailyStatisticData;
}
