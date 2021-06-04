import { IsString } from 'class-validator';

export class PaypalResource {
  @IsString()
  id?: string;
}
