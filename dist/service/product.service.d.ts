import { RedisService } from './redis.service';
export declare class ProductService {
    private readonly redisService;
    constructor(redisService: RedisService);
    getProduct(productId: string): Promise<any>;
}
