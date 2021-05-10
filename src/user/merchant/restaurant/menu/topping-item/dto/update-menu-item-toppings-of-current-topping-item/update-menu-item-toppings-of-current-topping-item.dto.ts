import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { MenuItemToppingDto } from './menu-item-topping.dto';

export class UpdateMenuItemToppingsOfCurrentToppingItemDto {
  @ApiProperty({
    example: [
      { menuItemId: '148cd922-b73b-47d3-bada-facdf7b42354', customPrice: null },
      { menuItemId: '528cd922-b73b-47d3-bada-facdf7b42354', customPrice: 3000 },
    ],
    required: true,
    nullable: false,
    description: 'Danh sách id món được thêm topping hiện tại',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemToppingDto)
  menuItemToppings: MenuItemToppingDto[];
}
