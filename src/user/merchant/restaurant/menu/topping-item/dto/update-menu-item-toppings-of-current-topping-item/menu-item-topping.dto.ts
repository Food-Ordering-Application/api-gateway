import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber } from 'class-validator';

export class MenuItemToppingDto {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Id món được thêm topping hiện tại',
  })
  @IsUUID()
  menuItemId: string;

  @ApiProperty({
    required: true,
    nullable: true,
    description: 'Tùy chọn giá topping cho món hiện tại',
  })
  @IsNumber()
  customPrice: number;
}
