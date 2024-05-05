import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/service/product.service';
import { RedisService } from '../../../src/service/redis.service';
import { productData } from '../../mocks/productData.mock';
import { mockedRedisService } from '../../mocks/redis-service-mock';

// 描述测试套件，即对 ProductService 进行测试
describe('ProductService', () => {
  let testingModule: TestingModule;
  let productService: ProductService;

  // 模拟的产品 URL 和产品 ID
  const productURL = 'https://dummyjson.com/products';
  const productId = '1';

  // 模拟的 fetch 方法返回的 Promise 对象
  const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve(productData),
    ok: true,
  });
  // 模拟全局的 fetch 方法
  const mockFetch = jest.spyOn(global, 'fetch') as jest.Mock;
  mockFetch.mockImplementation(() => mockFetchPromise);

  // 在所有测试用例之前，创建测试模块
  beforeAll(async () => {
    // 创建测试模块并注入需要的服务
    testingModule = await Test.createTestingModule({
      providers: [
        ProductService, // ProductService 实例
        {
          provide: RedisService, // RedisService 的模拟实例
          useValue: mockedRedisService, // 也可以使用工厂函数提供实例 useFactory: () => mockedRedisService
        },
      ],
    }).compile();

    // 获取 ProductService 实例以供测试使用
    productService = testingModule.get<ProductService>(ProductService);
  });

  // 在每个测试用例之后，清除所有的模拟调用
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 在所有测试用例之后，关闭测试模块
  afterAll(async () => {
    await testingModule.close();
  });

  // 测试从 API 成功获取产品的功能
  it('should successfully get product from API', async () => {
    // 模拟 RedisService 的 getProduct 方法返回 null，表示缓存中没有该产品
    mockedRedisService.getProduct.mockReturnValue(null);
    // 调用获取产品的方法
    await productService.getProduct(productId);
    // 断言 fetch 方法被调用了一次，并且传入了正确的参数
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(`${productURL}/${productId}`);
    // 断言 getProduct 方法被调用了一次，并且传入了正确的参数
    expect(mockedRedisService.getProduct).toHaveBeenCalledTimes(1);
    expect(mockedRedisService.getProduct).toHaveBeenCalledWith(productId);
  });

  // 测试从缓存成功获取产品的功能
  it('should successfully get product from cache', async () => {
    // 模拟 RedisService 的 getProduct 方法返回产品数据
    mockedRedisService.getProduct.mockReturnValue(productData);
    // 调用获取产品的方法
    const result = await productService.getProduct(productId);
    // 断言获取的结果与预期相符
    expect(result).toEqual({ data: productData });
    // 断言 fetch 方法未被调用，因为产品已从缓存中获取
    expect(mockFetch).toHaveBeenCalledTimes(0);
    // 断言 getProduct 方法被调用了一次，并且传入了正确的参数
    expect(mockedRedisService.getProduct).toHaveBeenCalledTimes(1);
    expect(mockedRedisService.getProduct).toHaveBeenCalledWith(productId);
  });

  // 测试当 fetch 失败时是否会抛出异常
  it('should throw if fetch fails', async () => {
    // 模拟 RedisService 的 getProduct 方法返回 null，表示缓存中没有该产品
    mockedRedisService.getProduct.mockReturnValue(null);
    // 模拟 fetch 方法抛出异常
    mockFetch.mockImplementationOnce(() => Promise.reject(new Error('error')));
    // 断言调用获取产品的方法会抛出预期的异常
    await expect(productService.getProduct(productId)).rejects.toThrow('error');
  });

  // 测试当 fetch.ok 为 false 时是否会抛出异常
  it('should throw if fetch.ok is false', async () => {
    // 模拟 RedisService 的 getProduct 方法返回 null，表示缓存中没有该产品
    mockedRedisService.getProduct.mockReturnValue(null);
    // 模拟 fetch 方法返回的 ok 字段为 false
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      }),
    );
    // 断言调用获取产品的方法会抛出预期的异常
    await expect(productService.getProduct(productId)).rejects.toThrow(
      'Something went wrong',
    );
  });
});

