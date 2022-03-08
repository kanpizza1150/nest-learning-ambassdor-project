import { NestFactory } from '@nestjs/core';
import { UserService } from '../module/user/user.service';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { AppModule } from '../app.module';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const password = await bcrypt.hash('1234', 12);
  for (let i = 0; i < 30; i++) {
    await userService.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      is_ambassador: true,
      password,
    });
  }
  process.exit();
})();
