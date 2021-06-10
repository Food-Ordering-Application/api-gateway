import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionCustomerJwtAuthGuard extends AuthGuard([
  'customer-jwt',
  'anonymous',
]) {}
