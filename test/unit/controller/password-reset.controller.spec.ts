import { Test, TestingModule } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { PasswordResetController } from '../../../src/controller/password-reset.controller';
import { PasswordResetService } from '../../../src/service/password-reset.service';

describe('PasswordResetController', () => {
  let testingModule: TestingModule; // 测试模块
  let passwordResetController: PasswordResetController; // 密码重置控制器
  const passwordResetServiceMock: MockProxy<PasswordResetService> = mock(); // 密码重置服务的模拟对象

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      // 创建测试模块
      controllers: [PasswordResetController], // 导入密码重置控制器
      providers: [
        {
          provide: PasswordResetService, // 提供密码重置服务
          useValue: passwordResetServiceMock, // 使用密码重置服务的模拟对象 
          // 也可以使用工厂函数提供实例 useFactory: () => passwordResetServiceMock
        },
      ],
    }).compile(); // 编译测试模块

    passwordResetController = testingModule.get<PasswordResetController>( // 获取密码重置控制器实例
      PasswordResetController,
    );
  });

  afterAll(async () => {
    await testingModule.close(); // 关闭测试模块
  });

  const token = '123456'; // 令牌
  const userId = 'userId'; // 用户ID
  const password = 'password'; // 密码

  it('should successfully generate password reset token', async () => {
    // 应成功生成密码重置令牌
    passwordResetServiceMock.generateResetToken.mockResolvedValueOnce({
      // 模拟生成密码重置令牌成功
      token,
    });
    const { data } = await passwordResetController.generateToken({ userId }); // 调用控制器生成令牌方法
    expect(passwordResetServiceMock.generateResetToken).toHaveBeenCalledTimes(
      // 断言生成令牌方法被调用一次
      1,
    );
    expect(passwordResetServiceMock.generateResetToken).toHaveBeenCalledWith(
      // 断言生成令牌方法被调用时传入了正确的参数
      userId,
    );
    expect(data).toEqual({ token }); // 断言返回的数据中包含正确的令牌
  });

  it('should successfully update password', async () => {
    // 应成功更新密码
    passwordResetServiceMock.getTokenUserId.mockResolvedValueOnce(userId); // 模拟获取令牌对应的用户ID成功
    await passwordResetController.updatePassword({ token, userId, password }); // 调用控制器更新密码方法
    expect(passwordResetServiceMock.getTokenUserId).toHaveBeenCalledTimes(1); // 断言获取令牌对应的用户ID方法被调用一次
    expect(passwordResetServiceMock.getTokenUserId).toHaveBeenCalledWith(token); // 断言获取令牌对应的用户ID方法被调用时传入了正确的令牌
  });

  it('should throw if token is invalid', async () => {
    // 若令牌无效应抛出异常
    passwordResetServiceMock.getTokenUserId.mockResolvedValueOnce(null); // 模拟获取令牌对应的用户ID失败
    await expect(
      passwordResetController.updatePassword({ token, userId, password }), // 调用控制器更新密码方法，预期会抛出异常
    ).rejects.toThrow('Invalid token'); // 预期抛出异常消息为"Invalid token"
  });
});
