import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetService } from '../../../src/service/password-reset.service';
import { RedisService } from '../../../src/service/redis.service';
import { mockedRedisService } from '../../mocks/redis-service-mock';

// 描述测试套件，即对 PasswordResetService 进行测试
describe('PasswordResetService', () => {
  let testingModule: TestingModule;
  let passwordResetService: PasswordResetService;

  // 模拟的 token 和 userId
  const token = '123456';
  const userId = 'userId';

  // 使用 jest.spyOn() 来模拟 Math.floor() 方法并返回 token 的数字形式
  jest.spyOn(Math, 'floor').mockReturnValue(+token);

  // 在所有测试用例之前，创建测试模块
  beforeAll(async () => {
    // 创建测试模块并注入需要的服务
    testingModule = await Test.createTestingModule({
      providers: [
        PasswordResetService, // PasswordResetService 实例
        {
          provide: RedisService, // RedisService 的模拟实例
          useValue: mockedRedisService, // 也可以使用工厂函数提供实例 useFactory: () => mockedRedisService
        },
      ],
    }).compile();

    // 获取 PasswordResetService 实例以供测试使用
    passwordResetService =
      testingModule.get<PasswordResetService>(PasswordResetService);
  });

  // 在每个测试用例之后，清除所有的模拟调用
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 在所有测试用例之后，关闭测试模块
  afterAll(async () => {
    await testingModule.close();
  });

  // 测试生成密码重置 token 的功能
  it('should successfully generate password reset token', async () => {
    // 调用生成 token 的方法
    const result = await passwordResetService.generateResetToken(userId);
    // 断言生成的 token 与预期相符
    expect(result).toEqual({ token });
    // 断言 saveResetToken 方法被调用了一次，并且传入了正确的参数
    expect(mockedRedisService.saveResetToken).toHaveBeenCalledTimes(1);
    expect(mockedRedisService.saveResetToken).toHaveBeenCalledWith(
      userId,
      token,
    );
  });

  // 测试根据 token 获取用户 ID 的功能
  it('should successfully get token user id', async () => {
    // 模拟 RedisService 的 getResetToken 方法返回 userId
    mockedRedisService.getResetToken.mockResolvedValue(userId);
    // 调用根据 token 获取用户 ID 的方法
    const result = await passwordResetService.getTokenUserId(token);
    // 断言获取的用户 ID 与预期相符
    expect(result).toEqual(userId);
    // 断言 getResetToken 方法被调用了一次，并且传入了正确的参数
    expect(mockedRedisService.getResetToken).toHaveBeenCalledTimes(1);
    expect(mockedRedisService.getResetToken).toHaveBeenCalledWith(token);
  });
});
