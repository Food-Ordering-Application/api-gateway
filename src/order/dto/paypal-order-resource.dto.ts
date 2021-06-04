import { IsOptional, IsString } from 'class-validator';

export class PaypalResource {
  @IsString()
  @IsOptional()
  id?: string;
}
