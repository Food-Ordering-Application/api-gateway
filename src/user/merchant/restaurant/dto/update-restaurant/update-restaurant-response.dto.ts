import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Restaurant updated successfully', type: 'string' })
  message: string;
}
