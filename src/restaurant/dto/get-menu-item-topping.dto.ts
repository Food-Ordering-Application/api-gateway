import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetMenuItemToppingDto {
  @ApiProperty({
    example: 'c5965070-7787-4074-833d-9a2294e651a7',
    required: true,
  })
  @IsUUID()
  menuItemId: number;
}
