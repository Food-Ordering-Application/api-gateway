import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { GeospatialDataDto } from './geospatial-data.dto';
import { OpenHoursDataExample } from './open-hours-data-example';
import { OpenHourDto } from './open-hours-data.dto';

export class CreateRestaurantDto {
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
    example: 5,
    required: true,
    description: 'Thành phố',
  })
  @IsString()
  cityId: number;

  @ApiProperty({ example: 143, required: true, description: 'Khu vực' })
  @IsInt()
  areaId: number;

  @ApiProperty({
    example: OpenHoursDataExample,
    required: true,
    description: 'Thời gian làm việc',
    type: [OpenHourDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpenHourDto)
  openHours: OpenHourDto[];

  @ApiProperty({
    example: [1, 5],
    nullable: true,
  })
  @IsArray()
  @IsInt({ each: true })
  categoryIds: number[];

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
}
