import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant not found', type: 'string' })
  message: string;
}
