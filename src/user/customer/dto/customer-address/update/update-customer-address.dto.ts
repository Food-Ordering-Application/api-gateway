import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCustomerAddressDto {
  @ApiProperty({
    example: '484 Sư Vạn Hạnh P.9 Q.10',
    required: true,
  })
  @IsString()
  address: string;

  @ApiProperty({ example: -77.0364, required: true })
  @IsNumber()
  longtitude: number;

  @ApiProperty({ example: 38.8951, required: true })
  @IsNumber()
  latitude: number;
}
