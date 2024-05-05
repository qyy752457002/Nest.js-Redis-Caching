// 导入NestFactory模块
import { NestFactory } from '@nestjs/core';
// 导入AppModule模块
import { AppModule } from './app.module';
// 导入ValidationPipe模块
import { ValidationPipe } from '@nestjs/common';
// 导入dotenv模块
import 'dotenv/config'; 

// 定义启动函数
async function bootstrap() {
  // 使用NestFactory创建一个应用实例
  const app = await NestFactory.create(AppModule);
  // 启用全局管道，用于验证
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  );
  // 启用关闭钩子
  app.enableShutdownHooks();
  // 监听端口或使用环境变量PORT，默认为3000
  await app.listen(process.env.PORT || 3000);

  // 打印应用运行的URL
  console.log(`Application is running on: ${await app.getUrl()}`);
}
// 调用启动函数
bootstrap();