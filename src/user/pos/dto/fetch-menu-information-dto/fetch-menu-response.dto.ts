import { ApiProperty } from '@nestjs/swagger';

export class FetchMenuResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Fetched menu successfully', type: 'string' })
  message: string;
  @ApiProperty({
    example: {
      menuId: '7bd1efce-d873-43b0-9412-14335dbe3b47 ',
    },
    nullable: true,
  })
  data: any;
}
