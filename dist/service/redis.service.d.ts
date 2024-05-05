import { ProductInterface } from '../domain/interface/product.interface';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';
export declare class RedisService {
    private readonly redisRepository;
    constructor(redisRepository: RedisRepository);
    saveProduct(productId: string, product: ProductInterface): Promise<void>;
    getProduct(productId: string): Promise<ProductInterface | null>;
    saveResetToken(userId: string, token: string): Promise<void>;
    getResetToken(token: string): Promise<string | null>;
}
