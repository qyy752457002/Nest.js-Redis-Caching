import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';

import { AppModule } from '../../../src/app.module';
import { RedisPrefixEnum } from '../../../src/domain/enum/redis-prefix-enum';
import { RedisRepository } from '../../../src/infrastructure/redis/repository/redis.repository';
import { RedisService } from '../../../src/service/redis.service';
import { productData } from '../../mocks/productData.mock';
import { mockRedis } from '../../mocks/redis-mock';

// 定义一天和十分钟的秒数常量
const oneDayInSeconds = 60 * 60 * 24;
const tenMinutesInSeconds = 60 * 10;

// 描述测试套件，即对 RedisService 进行测试
describe('RedisService', () => {
  let testingModule: TestingModule;
  let redisService: RedisService;

  // 模拟的 RedisRepository 实例
  const redisRepositoryMock: MockProxy<RedisRepository> = mock();

  // 在所有测试用例之前，创建测试模块
  beforeAll(async () => {
    // 创建测试模块并注入需要的服务
    testingModule = await Test.createTestingModule({
      imports: [AppModule], // 导入 AppModule
    })
      .overrideProvider('RedisClient') // 用模拟的 Redis 客户端替换原有的 RedisClient
      .useValue(mockRedis)
      .overrideProvider(RedisRepository) // 用模拟的 RedisRepository 实例替换原有的 RedisRepository
      .useValue(redisRepositoryMock)
      .compile();

    // 获取 RedisService 实例以供测试使用
    redisService = testingModule.get<RedisService>(RedisService);
  });

  // 在每个测试用例之后，清除所有的模拟调用
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 在所有测试用例之后，关闭测试模块
  afterAll(async () => {
    await testingModule.close();
  });

  // 测试成功保存产品的功能
  it('should successfully save product', async () => {
    const productId = 'product-id';
    // 调用保存产品的方法
    await redisService.saveProduct(productId, productData);
    // 断言 setWithExpiry 方法被调用了一次，并且传入了正确的参数
    expect(redisRepositoryMock.setWithExpiry).toHaveBeenCalledTimes(1);
    expect(redisRepositoryMock.setWithExpiry).toHaveBeenCalledWith(
      RedisPrefixEnum.PRODUCT,
      productId,
      JSON.stringify(productData),
      oneDayInSeconds,
    );
  });

  // 测试成功获取产品的功能
  it('should successfully get product', async () => {
    const productId = 'product-id';
    // 模拟 RedisRepository 的 get 方法返回产品数据
    redisRepositoryMock.get.mockResolvedValue(JSON.stringify(productData));
    // 调用获取产品的方法
    const result = await redisService.getProduct(productId);
    // 断言获取的结果与预期相符
    expect(result).toEqual(productData);
    // 断言 get 方法被调用了一次，并且传入了正确的参数
    expect(redisRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(redisRepositoryMock.get).toHaveBeenCalledWith(
      RedisPrefixEnum.PRODUCT,
      productId,
    );
  });

  // 测试成功保存重置令牌的功能
  it('should successfully save reset token', async () => {
    const userId = 'user-id';
    const token = 'token';
    // 调用保存重置令牌的方法
    await redisService.saveResetToken(userId, token);
    // 断言 setWithExpiry 方法被调用了一次，并且传入了正确的参数
    expect(redisRepositoryMock.setWithExpiry).toHaveBeenCalledTimes(1);
    expect(redisRepositoryMock.setWithExpiry).toHaveBeenCalledWith(
      RedisPrefixEnum.RESET_TOKEN,
      userId, 
      token,
      tenMinutesInSeconds,
    );
  });

  // 测试成功获取重置令牌的功能
  it('should successfully get reset token', async () => {
    const userId = 'user-id';
    const token = 'token';
    // 模拟 RedisRepository 的 get 方法返回用户 ID
    redisRepositoryMock.get.mockResolvedValue(userId);
    // 调用获取重置令牌的方法
    const result = await redisService.getResetToken(token);
    // 断言获取的结果与预期相符
    expect(result).toEqual(userId);
    // 断言 get 方法被调用了一次，并且传入了正确的参数
    expect(redisRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(redisRepositoryMock.get).toHaveBeenCalledWith(
      RedisPrefixEnum.RESET_TOKEN,
      token,
    );
  });
});
