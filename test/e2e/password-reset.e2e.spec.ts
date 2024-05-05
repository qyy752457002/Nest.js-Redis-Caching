// 导入 INestApplication、ValidationPipe、TestingModule、MockProxy、request 等
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import * as request from 'supertest';
import { PasswordResetController } from '../../src/controller/password-reset.controller';
import { PasswordResetService } from '../../src/service/password-reset.service';

// 描述（e2e）
describe('PasswordResetController (e2e)', () => {
  // 声明 app
  let app: INestApplication;
  // 声明 passwordResetServiceMock
  const passwordResetServiceMock: MockProxy<PasswordResetService> = mock();

  // 在所有测试之前执行
  beforeAll(async () => {
    // 创建测试模块
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [PasswordResetController],
      providers: [
        {
          provide: PasswordResetService,
          useValue: passwordResetServiceMock,
        },
      ],
    }).compile();

    // 创建 Nest 应用
    app = testingModule.createNestApplication();
    // 使用全局管道
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // 初始化应用
    await app.init();
  });

  // 在所有测试之后执行
  afterAll(async () => {
    // 关闭应用
    await app.close();
  });

  // 描述 'POST /reset-password/generate-token'
  describe('POST /reset-password/generate-token', () => {
    // 声明 route
    const route = '/reset-password/generate-token';

    // 声明 tokenData
    const tokenData = { token: 'token' };

    // 测试 'should return a token'
    it('should return a token', async () => {

      // 调用passwordResetServiceMock的generateResetToken方法，并且只调用一次，传入参数tokenData
      // 这行代码使用了 Jest 中的 mockResolvedValueOnce() 方法来模拟 generateResetToken 方法的返回值为 tokenData
      // 在这个情况下，当 generateResetToken 方法被调用时，它将返回一个已经被解析的 Promise，其解析值为 tokenData
      passwordResetServiceMock.generateResetToken.mockResolvedValueOnce(
        tokenData,
      );

      // 发送 POST 请求
      const response = await request(app.getHttpServer())
        .post(route)
        .send({ userId: '1' });
      // 断言状态码为 201
      expect(response.status).toBe(201);
      // 断言返回的数据等于 tokenData
      expect(response.body.data).toEqual(tokenData);
    });

    // 测试 'should return a 400 if userId is $userId'
    it.each`
      userId
      ${undefined}
      ${''}
      ${1}
    `('should return a 400 if userId is $userId', async ({ userId }) => {
      // 发送 POST 请求
      const response = await request(app.getHttpServer())
        .post(route)
        .send({ userId });
      // 断言状态码为 400
      expect(response.status).toBe(400);
    });
  });
});
