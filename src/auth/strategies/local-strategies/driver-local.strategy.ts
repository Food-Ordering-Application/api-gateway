import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { IDriver } from '../../../user/driver/interfaces';

@Injectable()
export class DriverLocalStrategy extends PassportStrategy(
  Strategy,
  'driver-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phoneNumber' });
  }

  async validate(phoneNumber: string, password: string): Promise<IDriver> {
    const user = await this.authService.validateDriver(phoneNumber, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
