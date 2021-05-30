import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoidOrderDto {
  @ApiProperty({
    example: ['03680b9c-b2fb-4f0a-b823-7f6278cd920b'],
    required: true,
  })
  @IsUUID('all', { each: true })
  orderItemIds: string[];

  @ApiProperty({ example: 'Huy vi het mon', required: true })
  @IsString()
  cashierNote: string;
}
