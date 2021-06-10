import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetFavoriteRestaurantsQueryParamsDto {
  @ApiPropertyOptional({ example: '0', required: false, default: '0' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: '10', required: false, default: '10' })
  @IsOptional()
  @IsNumberString()
  size?: string;
}
