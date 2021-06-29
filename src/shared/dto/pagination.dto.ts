import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: '0', required: false, default: '0' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: '10', required: false, default: '10' })
  @IsOptional()
  @IsNumberString()
  size?: string;
}
