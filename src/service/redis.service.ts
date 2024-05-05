import { Inject, Injectable } from '@nestjs/common';
import { RedisPrefixEnum } from '../domain/enum/redis-prefix-enum';
import { ProductInterface } from '../domain/interface/product.interface';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';

// 设置一天的时间戳
const oneDayInSeconds = 60 * 60 * 24;
// 设置十分钟的时间戳
const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  // 保存商品信息
  async saveProduct(
    productId: string,
    product: ProductInterface,
  ): Promise<void> {

    // 设置商品信息的过期时间为一小时
    await this.redisRepository.setWithExpiry(
      RedisPrefixEnum.PRODUCT,
      productId,
      JSON.stringify(product),
      oneDayInSeconds,
    );
  }

  // 获取商品信息
  async getProduct(productId: string): Promise<ProductInterface | null> {
    const product = await this.redisRepository.get(
      RedisPrefixEnum.PRODUCT,
      productId,
    );
    return JSON.parse(product);
  }

  // 保存重置密码的token
  async saveResetToken(userId: string, token: string): Promise<void> {

    // 设置重置密码token的过期时间为十分钟
    await this.redisRepository.setWithExpiry(
      RedisPrefixEnum.RESET_TOKEN,
      userId,
      token,
      tenMinutesInSeconds,
    );
  }

  // 获取重置密码的token
  async getResetToken(token: string): Promise<string | null> {
    return await this.redisRepository.get(RedisPrefixEnum.RESET_TOKEN, token);
  }
}
