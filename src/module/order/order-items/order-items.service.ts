import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../../shared/abstract.service';
import { Repository } from 'typeorm';
import { OrderItem } from './order-items.entity';

@Injectable()
export class OrderItemsService extends AbstractService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {
    super(orderItemRepository);
  }
}
