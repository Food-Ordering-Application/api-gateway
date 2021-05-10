import { POSITION_GAP } from './../../../../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    example: 'Thực đơn',
    required: true,
    description: 'Tên của menu',
  })
  @IsString()
  name: string;

  @ApiProperty({ example: true, required: true, description: `Hiển thị` })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: POSITION_GAP,
    required: true,
    description: `Vị trí (index của phần tử cuối cùng + ${POSITION_GAP})`,
  })
  @IsNumber()
  index: number;
}
