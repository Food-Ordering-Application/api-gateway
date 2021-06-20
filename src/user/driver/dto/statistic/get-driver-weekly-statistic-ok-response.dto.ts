import { ApiProperty } from '@nestjs/swagger';
import { IDriverStatisticData } from '../../interfaces';

export class GetDriverWeeklyStatisticOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get weekly statistic successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      statistic: [
        {
          date: '2021-06-20T09:02:23Z',
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: '2021-06-20T09:02:23Z',
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: '2021-06-20T09:02:23Z',
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
      ],
    },
    type: 'string',
  })
  data: IDriverStatisticData;
}
