import { MetaModule } from './meta/meta.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from './casl/casl.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import * as Joi from 'joi';
import { GeoModule } from './geo/geo.module';
import { MicroserviceModule } from './microservice/microservice.module';

@Module({
  imports: [
    MicroserviceModule,
    MetaModule,
    GeoModule,
    RestaurantModule,
    OrderModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
      // envFilePath: '../.env',
    }),
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
