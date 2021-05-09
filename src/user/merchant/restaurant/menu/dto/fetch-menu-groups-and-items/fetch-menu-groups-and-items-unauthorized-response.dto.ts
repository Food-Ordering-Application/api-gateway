import { ApiProperty } from '@nestjs/swagger';

export class FetchMenuGroupsAndItemsUnauthorizedResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized', type: 'string' })
  message: string;
}
