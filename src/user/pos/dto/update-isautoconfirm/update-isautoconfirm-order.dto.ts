import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ETrueFalse } from '../../../../shared/enum';

export class UpdateIsAutoConfirmOrderDto {
  @ApiProperty({
    example: ETrueFalse.TRUE,
    enum: ETrueFalse,
    required: true,
  })
  @IsString()
  isAutoConfirm: string;
  @ApiProperty({
    example: 'fef41594-94b8-469e-82c9-ea8b244693b9',
    required: true,
  })
  @IsUUID()
  restaurantId: string;
}
