// 导入Test和TestingModule
import { Test, TestingModule } from '@nestjs/testing';
// 导入AppModule
import { AppModule } from '../../../../src/app.module';
// 导入RedisRepositoryInterface
import { RedisRepositoryInterface } from '../../../../src/domain/interface/redis.repository.interface';
// 导入RedisRepository
import { RedisRepository } from '../../../../src/infrastructure/redis/repository/redis.repository';
// 导入mockRedis
import { mockRedis } from '../../../mocks/redis-mock';

// 描述RedisRepository
describe('RedisRepository', () => {
  // 声明测试模块
  let testingModule: TestingModule;
  // 声明redisRepository
  let redisRepository: RedisRepositoryInterface;

  // 在所有测试运行前执行
  beforeAll(async () => {
    // 创建测试模块并Override RedisClient
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('RedisClient')
      .useValue(mockRedis)
      .compile();

    // 获取redisRepository
    redisRepository = testingModule.get<RedisRepository>(RedisRepository);
  });

  // 在所有测试运行后执行
  afterAll(async () => {
    // 清空所有mock
    jest.clearAllMocks();
    // 关闭测试模块
    await testingModule.close();
  });

  // 测试get方法
  it('should correctly get key', async () => {
    const prefix = 'prefix';
    const key = 'key';
    const value = 'value';
    // 设置mockRedis.get的返回值
    mockRedis.get.mockResolvedValue(value);

    // 执行测试
    const result = await redisRepository.get(prefix, key);
    // 断言
    expect(result).toEqual(value);
    expect(mockRedis.get).toHaveBeenCalledTimes(1);
    expect(mockRedis.get).toHaveBeenCalledWith(`${prefix}:${key}`);
  });

  // 测试set方法
  it('should correctly set key', async () => {
    const prefix = 'prefix';
    const key = 'key';
    const value = 'value';

    // 执行测试
    await redisRepository.set(prefix, key, value);
    // 断言
    expect(mockRedis.set).toHaveBeenCalledTimes(1);
    expect(mockRedis.set).toHaveBeenCalledWith(`${prefix}:${key}`, value);
  });

  // 测试delete方法
  it('should correctly delete key', async () => {
    const prefix = 'prefix';
    const key = 'key';

    // 执行测试
    await redisRepository.delete(prefix, key);
    // 断言
    expect(mockRedis.del).toHaveBeenCalledTimes(1);
    expect(mockRedis.del).toHaveBeenCalledWith(`${prefix}:${key}`);
  });

  // 测试setWithExpiry方法
  it('should correctly set key with expiry', async () => {
    const prefix = 'prefix';
    const key = 'key';
    const value = 'value';

    // 执行测试
    await redisRepository.setWithExpiry(prefix, key, value, 100);
    // 断言
    expect(mockRedis.set).toHaveBeenCalledTimes(1);
    expect(mockRedis.set).toHaveBeenCalledWith(
      `${prefix}:${key}`,
      value,
      'EX',
      100,
    );
  });
});
