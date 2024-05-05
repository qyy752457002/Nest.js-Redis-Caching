// 导入 Nest 相关的模块和类
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductInterface } from '../domain/interface/product.interface';
import { RedisService } from './redis.service';

// 设置模拟的 API URL
const productURL = 'https://dummyjson.com/products/';

// 创建一个注入 Redis 服务器的服务类
@Injectable()
export class ProductService {
  // 注入 Redis 服务器
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  // 获取指定 ID 的产品信息
  async getProduct(productId: string): Promise<any> {
    // 从 Redis 中获取产品信息
    const product = await this.redisService.getProduct(productId);
    // 如果 Redis 中存在该产品信息，则返回
    if (product) {
      console.log('Cache hit!: Product found in Redis');
      return { data: product };
    }

    // 否则从模拟的 API 中获取信息
    const res = await fetch(`${productURL}${productId}`);

    // 如果获取成功，则将产品信息存入 Redis
    if (res.ok) {
      const product: ProductInterface = await res.json();
      await this.redisService.saveProduct(`${product.id}`, product);
      console.log('Cache miss!: Product not found in Redis');
      return product;
    } else {
      // 如果获取失败，则抛出异常
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
