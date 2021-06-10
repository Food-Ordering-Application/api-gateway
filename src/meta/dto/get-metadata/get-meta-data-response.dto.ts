import { ApiProperty } from '@nestjs/swagger';
import { IMetaData } from './../../interfaces/';
import { GetMetaDataExample } from './get-meta-data-example';

export class GetMetaDataResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched meta data successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: GetMetaDataExample,
  })
  data: IMetaData;
}
