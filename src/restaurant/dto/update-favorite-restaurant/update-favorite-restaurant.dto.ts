import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateFavoriteRestaurantDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isFavorite: boolean;
}
