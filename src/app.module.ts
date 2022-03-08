import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabasesModule } from './module/database/database.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ProductModule } from './module/product/product.module';
import { OrderModule } from './module/order/order.module';
import { LinkModule } from './module/link/link.module';
import { SharedModule } from './module/shared/shared.module';

@Module({
  imports: [
    DatabasesModule,
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    LinkModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
