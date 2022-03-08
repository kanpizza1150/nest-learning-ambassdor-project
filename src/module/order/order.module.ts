import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { OrderItem } from './order-items/order-items.entity';
import { OrderItemsService } from './order-items/order-items.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), SharedModule],
  controllers: [OrderController],
  providers: [OrderService, OrderItemsService],
})
export class OrderModule {}
