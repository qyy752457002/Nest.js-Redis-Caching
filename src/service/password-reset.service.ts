import { Inject, Injectable } from '@nestjs/common';
import { ResetTokenInterface } from '../domain/interface/reset.token.interface';
import { RedisService } from './redis.service';

@Injectable()
export class PasswordResetService {
  constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  // 生成重置密码的token
  async generateResetToken(userId: string): Promise<ResetTokenInterface> {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redisService.saveResetToken(userId, token);
    return { token };
  }

  // 根据token获取用户id
  async getTokenUserId(token: string): Promise<string | null> {
    return await this.redisService.getResetToken(token);
  }
}
