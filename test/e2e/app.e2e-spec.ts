// 导入Test和TestingModule，INestApplication，request，AppController，AppService
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from '../../src/controller/app.controller';
import { AppService } from '../../src/service/app.service';

// 描述（e2e）：测试AppController
describe('AppController (e2e)', () => {
  // 定义app变量
  let app: INestApplication;

  // 在所有测试之前执行
  beforeAll(async () => {
    // 创建测试模块
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // 创建Nest应用
    app = moduleFixture.createNestApplication();
    // 初始化应用
    await app.init();
  });

  // 在所有测试之后执行
  afterAll(async () => {
    // 关闭应用
    await app.close();
  });

  // 测试'/'（GET）
  it('/ (GET)', () => {
    // 发送GET请求到应用的HTTP服务器
    return (
      request(app.getHttpServer())
        // 期望返回状态码200
        .get('/')
        .expect(200)
        // 期望返回内容'Hello World!'
        .expect('Hello World!')
    );
  });
});
