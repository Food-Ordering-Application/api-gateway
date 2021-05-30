import { ApiProperty } from '@nestjs/swagger';
import { IDriverData } from '../../interfaces';

export class RegisterDriverCreatedResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ example: 'Driver created successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {},
    nullable: true,
  })
  data: IDriverData;
}
