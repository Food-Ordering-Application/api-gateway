import { ApiProperty } from '@nestjs/swagger';
import { IDriverStatisticData } from '../../interfaces';

export class GetDriverMonthlyStatisticOkResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Get monthly statistic successfully',
    type: 'string',
  })
  message: string;
  @ApiProperty({
    example: {
      statistic: [
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
          income: 1234,
          numOrderFinished: 5,
          commission: 123,
        },
        {
          date: {
            day: '5',
            month: '12',
            year: '2021',
          },
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
