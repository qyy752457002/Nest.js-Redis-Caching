import { ResetTokenInterface } from '../domain/interface/reset.token.interface';
import { RedisService } from './redis.service';
export declare class PasswordResetService {
    private readonly redisService;
    constructor(redisService: RedisService);
    generateResetToken(userId: string): Promise<ResetTokenInterface>;
    getTokenUserId(token: string): Promise<string | null>;
}
