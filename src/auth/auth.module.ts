import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { PosJwtStrategy } from './strategies/jwt-strategies/pos-jwt.strategy';
import { PosLocalStrategy } from './strategies/local-strategies/pos-local.strategy';
import { AdminLocalStrategy } from './strategies/local-strategies/admin-local.strategy';
import { MerchantJwtStrategy } from './strategies/jwt-strategies/merchant-jwt.strategy';
import { MerchantLocalStrategy } from './strategies/local-strategies/merchant-local.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { CustomerLocalStrategy } from './strategies/local-strategies/customer-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '../constants';
import { CustomerJwtStrategy } from './strategies/jwt-strategies/customer-jwt.strategy';
import { AdminJwtStrategy } from './strategies/jwt-strategies/admin-jwt.strategy';
import { DriverLocalStrategy } from './strategies/local-strategies/driver-local.strategy';
import { DriverJwtStrategy } from './strategies/jwt-strategies/driver-jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: { expiresIn: '14d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    CustomerLocalStrategy,
    CustomerJwtStrategy,
    DriverLocalStrategy,
    DriverJwtStrategy,
    MerchantLocalStrategy,
    MerchantJwtStrategy,
    AdminLocalStrategy,
    AdminJwtStrategy,
    PosLocalStrategy,
    PosJwtStrategy,
    AnonymousStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
