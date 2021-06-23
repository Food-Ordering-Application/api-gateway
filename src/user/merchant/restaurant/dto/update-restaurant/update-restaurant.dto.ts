import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { GeospatialDataDto } from '..';

export class UpdateRestaurantFullDto {
  @ApiProperty({
    example: 'Quán Ăn Maika',
    required: true,
    description: 'Tên của nhà hàng',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '0949657934',
    required: true,
    description: 'Số điện thoại của nhà hàng',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '528 Nguyễn Trãi, P. 8, Quận 5, TP. HCM',
    required: true,
    description: 'Địa chỉ của nhà hàng',
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
    description: 'Tọa độ trên bản đồ của nhà hàng',
  })
  @ValidateNested()
  geo: GeospatialDataDto;

  @ApiProperty({
    example: 'http://lorempixel.com/640/480',
    required: true,
    description: 'Ảnh hiển thị của nhà hàng',
  })
  @IsString()
  coverImageUrl: string;

  @ApiProperty({
    example: 'http://lorempixel.com/640/480',
    required: true,
    description:
      'Ảnh mặt tiền của quán để xác thực (toàn bộ mặt tiền, biển hiệu, số nhà, cửa chính của quán)',
  })
  @IsString()
  verifiedImageUrl: string;

  @ApiPropertyOptional({
    example: '0',
    required: false,
    description: 'Link video đại diện của quán',
  })
  videoUrl?: string;

  @ApiProperty({ example: true, required: true, description: `Hiển thị` })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateRestaurantDto extends PartialType(UpdateRestaurantFullDto) {}
