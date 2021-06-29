import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationDto } from './../../../../shared/dto/pagination.dto';

export class FetchRestaurantDto extends PaginationDto {
  @ApiProperty({
    example: 'Maika',
    required: false,
  })
  q: string;
}
