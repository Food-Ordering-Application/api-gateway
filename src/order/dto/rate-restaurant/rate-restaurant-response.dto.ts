import { ApiProperty } from '@nestjs/swagger';

export class RateRestaurantResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Feedback restaurant successfully',
  })
  message: string;
}
