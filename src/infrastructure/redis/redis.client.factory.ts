// 导入 FactoryProvider 类，用于创建工厂实例
import { FactoryProvider } from '@nestjs/common';
// 导入 Redis 类，用于连接 Redis 数据库
import { Redis } from 'ioredis'

// 导出 Redis 客户端工厂类，用于创建 Redis 客户端实例
export const redisClientFactory: FactoryProvider<Redis> = {
  // 指定工厂类提供的服务名称
  provide: 'RedisClient',

  // 创建 Redis 客户端实例
  useFactory: () => {
    // 创建 Redis 实例，从环境变量中获取 Redis 服务器地址
    const redisInstance = new Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    });

    // 监听 Redis 连接错误
    redisInstance.on('error', (err) => {
      // 抛出错误信息
      throw new Error(`Redis connection failed: ${err}`);
    });

    // 返回 Redis 实例
    return redisInstance;
  },

  // 注入依赖
  inject: [],
}
