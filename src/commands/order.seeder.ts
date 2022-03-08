import { NestFactory } from '@nestjs/core';
import { faker } from '@faker-js/faker';
import { AppModule } from '../app.module';
import { randomInt } from 'crypto';
import { OrderService } from '../module/order/order.service';
import { OrderItemsService } from '../module/order/order-items/order-items.service';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const orderService = app.get(OrderService);
  const orderItemService = app.get(OrderItemsService);
  for (let i = 0; i < 30; i++) {
    const order = await orderService.save({
      user_id: randomInt(2, 31),
      code: faker.lorem.slug(2),
      ambassador_email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      complete: true,
    });
    for (let i = 0; i < randomInt(1, 5); i++) {
      await orderItemService.save({
        order,
        product_title: faker.lorem.words(2),
        price: randomInt(10, 100),
        quantity: randomInt(1, 5),
        admin_revenue: randomInt(10, 100),
        ambassador_revenue: randomInt(1, 10),
      });
    }
  }
  process.exit();
})();
