import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DriverLocalAuthGuard extends AuthGuard('driver-local') {}
