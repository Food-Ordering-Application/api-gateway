import { ApiProperty } from '@nestjs/swagger';

export class UpdateFavoriteRestaurantResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Like restaurant successfully', type: 'string' })
  message: string;
}
