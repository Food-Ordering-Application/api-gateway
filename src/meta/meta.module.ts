import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RESTAURANT_SERVICE } from 'src/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RESTAURANT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('AMQP_URL') as string],
            queue: configService.get('RESTAURANT_AMQP_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [MetaController],
  providers: [MetaService],
})
export class GeoModule {}
