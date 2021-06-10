import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AnyJwtAuthGuard extends AuthGuard([
  'customer-jwt',
  'admin-jwt',
  'driver-jwt',
  'merchant-jwt',
  'pos-jwt',
]) {}
