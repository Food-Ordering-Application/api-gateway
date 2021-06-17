import { ApiProperty } from '@nestjs/swagger';

export class GetDriverActiveStatusResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;
  @ApiProperty({
    example: 'Get active status successfully',
  })
  message: string;
  @ApiProperty({
    example: {
      activeStatus: true,
    },
  })
  data?: {
    activeStatus: boolean;
  };
}
