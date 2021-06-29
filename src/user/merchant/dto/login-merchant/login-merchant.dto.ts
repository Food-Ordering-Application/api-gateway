import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginMerchantDto {
  @ApiProperty({ example: 'merchant123', uniqueItems: true, required: true })
  @MinLength(6)
  @MaxLength(30)
  @IsString()
  username: string;

  @ApiProperty({ minLength: 6, example: '123123', required: true })
  @IsString()
  password: string;
}
