import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuItemToppingsOfCurrentMenuItemResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({
    example: 'Menu item toppings updated successfully',
    type: 'string',
  })
  message: string;
}
