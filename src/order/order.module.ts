import { Module } from '@nestjs/common';
import { CaslModule } from '../casl/casl.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [CaslModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
