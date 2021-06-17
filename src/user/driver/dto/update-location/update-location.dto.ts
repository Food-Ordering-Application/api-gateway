import { ApiProperty } from '@nestjs/swagger';
import { Max, Min, IsNumber, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty({
    example: 10.762921400332274,
    description: 'Only for testing',
  })
  @Max(90)
  @Min(-90)
  @IsNumber()
  @IsOptional()
  latitude: number;

  @ApiProperty({
    example: 106.6819735315213,
    description: 'Only for testing',
  })
  @Max(180)
  @Min(-180)
  @IsNumber()
  @IsOptional()
  longitude: number;
}
