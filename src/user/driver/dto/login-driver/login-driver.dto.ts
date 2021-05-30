import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from '../../../customer/dto';

export class LoginDriverDto extends PartialType(CreateCustomerDto) {}
