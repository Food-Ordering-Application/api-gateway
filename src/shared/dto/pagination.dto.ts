import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: '0', required: false, default: '0' })
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: '10', required: false, default: '10' })
  @IsNumberString()
  size?: string;
}
