import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeospatialDataDto {
  @ApiProperty({
    example: 10.7548816691903,
    required: true,
    description: 'Kinh độ',
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: 106.669695864843,
    required: true,
    description: 'Vĩ độ',
  })
  @IsNumber()
  longitude: number;
}
