import { Module } from '@nestjs/common';
import { RedisService } from '../../service/redis.service';
import { redisClientFactory } from './redis.client.factory';
import { RedisRepository } from './repository/redis.repository';

@Module({
  // RedisModule导入的模块
  imports: [],
  // 声明RedisModule的控制器
  controllers: [],
  // 声明RedisModule的提供者
  providers: [redisClientFactory, RedisService, RedisRepository],
  // 将RedisService导出，使其他模块可以访问
  exports: [RedisService],  
  /* 
    例如：在另一个模块中使用 RedisModule 中导出的 RedisService: 
    import { RedisService } from '../infrastructure/redis/redis.module.ts';
  */
})
export class RedisModule {}
