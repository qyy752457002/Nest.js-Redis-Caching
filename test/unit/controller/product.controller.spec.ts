import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { ProductController } from '../../../src/controller/product.controller';
import { ProductService } from '../../../src/service/product.service';
import { productData } from '../../mocks/productData.mock';

// 描述测试用例集合的开始
describe('ProductController', () => {
  let testingModule: TestingModule;
  let productController: ProductController;
  // 声明一个 ProductService 的模拟对象
  const productServiceMock: MockProxy<ProductService> = mock();

  // 在所有测试用例之前执行的操作
  beforeAll(async () => {
    // 创建一个 NestJS 测试模块
    testingModule = await Test.createTestingModule({
      controllers: [ProductController], // 声明要测试的控制器
      providers: [
        {
          provide: ProductService, // 声明要替换的服务
          useValue: productServiceMock, // 使用模拟的服务
          // 也可以使用工厂函数提供实例 useFactory: () => productServiceMock
        },
      ],
    }).compile();

    // 获取 ProductController 实例
    productController = testingModule.get<ProductController>(ProductController);
  });

  // 在每个测试用例之后执行的操作
  afterEach(() => {
    jest.clearAllMocks(); // 清除所有模拟函数的调用记录
  });

  // 在所有测试用例之后执行的操作
  afterAll(async () => {
    await testingModule.close(); // 关闭测试模块
  });

  // 描述单个测试用例：应成功获取产品
  it('should successfully get product', async () => {
    const productId = '1'; // 产品的 ID
    productServiceMock.getProduct.mockResolvedValueOnce(productData); // 模拟 getProduct 方法的返回值为 productData
    const { data } = await productController.getProduct({ productId }); // 调用控制器的 getProduct 方法

    // 断言模拟的 getProduct 方法被调用了一次，并且传入了正确的参数
    expect(productServiceMock.getProduct).toHaveBeenCalledTimes(1);
    expect(productServiceMock.getProduct).toHaveBeenCalledWith(productId);

    // 断言返回的数据与模拟的数据相等
    expect(data).toEqual(productData);
  });
});
