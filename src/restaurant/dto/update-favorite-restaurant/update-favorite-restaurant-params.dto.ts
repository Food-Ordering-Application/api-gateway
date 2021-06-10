import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateFavoriteRestaurantParamsDto {
  @ApiProperty({ example: 'fef41594-94b8-469e-82c9-ea8b244693b9' })
  @IsUUID()
  restaurantId: string;
}
