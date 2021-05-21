import { ApiProperty } from '@nestjs/swagger';

export class SendResetPasswordEmailResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Reset password sent successfully', type: 'string' })
  message: string;
}
