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
        { income: 1234, numOrderFinished: 5, commission: 123 },
        { income: 1234, numOrderFinished: 5, commission: 123 },
        { income: 1234, numOrderFinished: 5, commission: 123 },
      ],
    },
    type: 'string',
  })
  data: IDriverStatisticData;
}
