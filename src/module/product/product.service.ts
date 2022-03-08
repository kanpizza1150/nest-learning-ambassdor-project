import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends AbstractService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {
    super(productsRepository);
  }
}
