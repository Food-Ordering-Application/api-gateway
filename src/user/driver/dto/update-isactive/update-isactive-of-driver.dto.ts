import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EIsActive } from '../../enums';

export class UpdateIsActiveOfDriverDto {
  @ApiProperty({
    example: EIsActive.TRUE,
    enum: EIsActive,
    required: true,
  })
  @IsString()
  isActive: string;
}
