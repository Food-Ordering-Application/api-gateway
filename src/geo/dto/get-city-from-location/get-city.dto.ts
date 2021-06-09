import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Position } from 'src/shared/dto/position.dto';

export class GetCityDto {
  @ApiProperty({
    example: {
      position: {
        latitude: 10.7548816691903,
        longitude: 106.669695864843,
      },
    },
  })
  @ValidateNested()
  @Type(() => Position)
  position: Position;
}
