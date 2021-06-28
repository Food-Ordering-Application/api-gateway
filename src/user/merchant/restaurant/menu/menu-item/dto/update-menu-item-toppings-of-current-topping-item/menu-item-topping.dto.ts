import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsOptional } from 'class-validator';

export class MenuItemToppingDto {
  @ApiProperty({
    required: true,
    nullable: false,
    description: 'Id topping được thêm cho món hiện tại',
  })
  @IsUUID()
  toppingItemId: string;

  @ApiProperty({
    required: true,
    nullable: true,
    description: 'Tùy chọn giá topping cho món hiện tại',
  })
  @IsNumber()
  @IsOptional()
  customPrice: number;
}
