import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuItemToppingsOfCurrentToppingItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Menu item toppings updated successfully', type: 'string' })
  message: string;
}
