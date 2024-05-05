import {
  BadRequestException, // 错误请求异常
  Body, // 请求体装饰器
  Controller, // 控制器装饰器
  Get, // GET请求装饰器
  Post, // POST请求装饰器
} from '@nestjs/common'; // 导入NestJS常用模块
import { ResetTokenInterface } from '../domain/interface/reset.token.interface'; // 导入重置令牌接口
import { PasswordResetService } from '../service/password-reset.service'; // 导入密码重置服务
import { PasswordResetTokenRequestDTO } from './dto/password-reset-token-request.dto'; // 导入密码重置令牌请求DTO
import { PasswordUpdateRequestDTO } from './dto/password-update-request.dto'; // 导入密码更新请求DTO

@Controller('reset-password') // 控制器路由前缀
export class PasswordResetController {
  // 密码重置控制器类
  constructor(private readonly passwordResetService: PasswordResetService) {} // 构造函数注入密码重置服务

  @Post('/generate-token') // POST请求生成令牌路由装饰器
  async generateToken(
    @Body() passwordResetTokenRequestDTO: PasswordResetTokenRequestDTO, // 请求体参数装饰器
  ): Promise<{ data: ResetTokenInterface }> {
    // 异步生成令牌方法
    const data = await this.passwordResetService.generateResetToken(
      // 调用密码重置服务生成重置令牌
      passwordResetTokenRequestDTO.userId, // 从请求DTO中获取用户ID
    );
    return { data }; // 返回数据对象
  }

  @Get('/update-password') // GET请求更新密码路由装饰器
  async updatePassword(
    @Body() passwordUpdateRequestDTO: PasswordUpdateRequestDTO, // 请求体参数装饰器
  ): Promise<void> {
    // 异步更新密码方法
    // 检查令牌是否有效
    const userId = await this.passwordResetService.getTokenUserId(
      // 调用密码重置服务获取令牌对应的用户ID
      passwordUpdateRequestDTO.token, // 从请求DTO中获取令牌
    );
    if (userId) {
      // 如果存在用户ID
      // TODO 更新用户密码
      console.log('Password updated successfully'); // 打印密码更新成功信息
    } else {
      throw new BadRequestException('Invalid token'); // 抛出错误请求异常，令牌无效
    }
  }
}
