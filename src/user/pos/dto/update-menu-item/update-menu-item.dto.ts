import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { State } from '../enums';

export class UpdateMenuItemDto {
  @ApiProperty({
    example: State.OUT_OF_STOCK,
    enum: State,
  })
  @IsEnum(State)
  state: State;
}
