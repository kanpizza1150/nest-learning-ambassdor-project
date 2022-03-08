import { NestFactory } from '@nestjs/core';
import { faker } from '@faker-js/faker';
import { AppModule } from '../app.module';
import { ProductService } from '../module/product/product.service';
import { randomInt } from 'crypto';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productService = app.get(ProductService);
  for (let i = 0; i < 30; i++) {
    await productService.save({
      title: faker.lorem.word(2),
      description: faker.lorem.word(10),
      price: randomInt(10, 1000),
      image: faker.image.imageUrl(200, 200, '', true),
    });
  }
  process.exit();
})();
