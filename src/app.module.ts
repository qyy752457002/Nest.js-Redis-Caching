import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { PasswordResetController } from './controller/password-reset.controller';
import { ProductController } from './controller/product.controller';
import { RedisModule } from './infrastructure/redis/redis.module';
import { AppService } from './service/app.service';
import { PasswordResetService } from './service/password-reset.service';
import { ProductService } from './service/product.service';

@Module({
  // 导入 Redis 模块，以便在应用中使用 Redis
  imports: [RedisModule],
  // 声明控制器，用于处理传入的 HTTP 请求
  controllers: [AppController, ProductController, PasswordResetController],
  // 声明服务，用于处理业务逻辑
  providers: [AppService, ProductService, PasswordResetService],
})
export class AppModule {}
