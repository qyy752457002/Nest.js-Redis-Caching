import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import * as request from 'supertest';
import { ProductController } from '../../src/controller/product.controller';
import { ProductService } from '../../src/service/product.service';
import { productData } from '../mocks/productData.mock';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  const productServiceMock: MockProxy<ProductService> = mock();

  beforeAll(async () => {
    // 在所有测试用例之前执行的代码块
    const testingModule: TestingModule = await Test.createTestingModule({
      // 创建测试模块
      controllers: [ProductController], // 指定要测试的控制器
      providers: [
        {
          // 提供模拟的 ProductService
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    }).compile(); // 编译测试模块

    app = testingModule.createNestApplication(); // 创建 Nest 应用程序
    app.useGlobalPipes(new ValidationPipe({ transform: true })); // 使用全局验证管道

    await app.init(); // 初始化应用程序
  });

  afterAll(async () => {
    // 在所有测试用例之后执行的代码块
    await app.close(); // 关闭应用程序
  });

  describe('GET /products/:productId', () => {
    // 描述针对 GET /products/:productId 路由的测试用例
    const route = '/products'; // 定义路由路径

    it('should return a product', async () => {
      // 测试用例：应返回产品
      const productId = 1; // 定义产品 ID

      // 这行代码使用了 Jest 中的 mockResolvedValueOnce() 方法来模拟 getProduct 方法的返回值为 productData
      // 在这个情况下，当 getProduct 方法被调用时，它将返回一个已经被解析的 Promise，其解析值为 productData
      productServiceMock.getProduct.mockResolvedValueOnce(productData); // 模拟 getProduct 方法返回 productData

      const response = await request(app.getHttpServer()).get(
        `${route}/${productId}`,
      ); // 发起 GET 请求获取产品信息
      expect(response.status).toBe(200); // 断言响应状态码为 200
      expect(response.body.data).toEqual(productData); // 断言响应数据与 productData 相等
    });

    it('should return a 400 if productId is not in range [1, 10]', async () => {
      // 测试用例：如果 productId 不在范围 [1, 10] 内，应返回 400
      const productId = 11; // 定义不在范围内的产品 ID

      const response = await request(app.getHttpServer()).get(
        `${route}/${productId}`,
      ); // 发起 GET 请求获取产品信息
      expect(response.status).toBe(400); // 断言响应状态码为 400
      expect(response.body.message).toEqual([
        'productId must be between 1 - 10',
      ]); // 断言响应消息为指定的错误消息
    });
  });
});
