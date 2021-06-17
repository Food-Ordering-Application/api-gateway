import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateIsActiveOfDriverDto {
  @ApiProperty({
    example: true,
    required: true,
  })
  @IsBoolean()
  activeStatus: boolean;

  @ApiProperty({
    example: 10.762921400332274,
  })
  @Max(90)
  @Min(-90)
  @IsNumber()
  @IsOptional()
  latitude: number;

  @ApiProperty({
    example: 106.6819735315213,
  })
  @Max(180)
  @Min(-180)
  @IsNumber()
  @IsOptional()
  longitude: number;
}
