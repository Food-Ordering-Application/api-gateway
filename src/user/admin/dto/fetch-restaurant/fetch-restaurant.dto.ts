import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from './../../../../shared/dto/pagination.dto';

export class FetchRestaurantDto extends PaginationDto {
  @ApiProperty({
    example: 'Maika',
    required: false,
  })
  q: string;
}
