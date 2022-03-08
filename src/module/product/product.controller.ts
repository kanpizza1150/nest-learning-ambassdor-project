import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { ProductService } from './product.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor) //to ignore @Exclude column in entity
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get('admin/products')
  async all() {
    return this.productService.find();
  }

  @UseGuards(AuthGuard)
  @Post('admin/products')
  async create(@Body() body: CreateProductDto) {
    return this.productService.save(body);
  }

  @UseGuards(AuthGuard)
  @Get('admin/products/:id')
  async get(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put('admin/products/:id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    await this.productService.update(id, body);
    return this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete('admin/products/:id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
