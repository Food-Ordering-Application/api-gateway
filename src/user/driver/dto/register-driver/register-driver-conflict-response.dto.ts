import { ApiProperty } from '@nestjs/swagger';
import { IDriverData } from '../../interfaces';

export class RegisterDriverConflictResponseDto {
  @ApiProperty({ example: 409 })
  statusCode: number;
  @ApiProperty({ example: 'Conflicted', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      driver: null,
    },
    nullable: true,
  })
  data: IDriverData;
}
