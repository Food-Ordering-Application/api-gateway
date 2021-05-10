import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateMenuItemToppingsOfCurrentToppingItemDto {
  @ApiProperty({
    example: ['148cd922-b73b-47d3-bada-facdf7b42354'],
    required: true,
    nullable: false,
    description: 'Danh sách id món được thêm topping hiện tại',
  })
  @IsUUID('all', { each: true })
  menuItems: string[];
}
