import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaypalResource } from '.';

export class EventPaypalOrderOccurDto {
  @ApiProperty({
    example: 'CHECKOUT.ORDER.COMPLETED',
    required: false,
  })
  @IsString()
  @IsOptional()
  event_type?: string;
  @ApiProperty({
    example: {
      id: '8N0141729C630174W',
    },
    required: true,
  })
  @ValidateNested()
  @Type(() => PaypalResource)
  @IsOptional()
  resource?: PaypalResource;
}
