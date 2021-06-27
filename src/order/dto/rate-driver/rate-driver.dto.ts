import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { Rating } from 'src/order/enums';

export class RateDriverDto {
  @ApiProperty({
    example: [43],
    nullable: true,
  })
  @IsArray()
  @IsInt({ each: true })
  reasonIds: number[];

  @ApiProperty({
    example: Rating.FOUR_STAR,
    enum: Rating,
    required: true,
  })
  @IsEnum(Rating)
  @IsNumber()
  rate: Rating;

  @ApiProperty({
    example: 'Ngon!',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  message: string;
}
