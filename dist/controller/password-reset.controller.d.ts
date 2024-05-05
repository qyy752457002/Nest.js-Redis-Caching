import { ResetTokenInterface } from '../domain/interface/reset.token.interface';
import { PasswordResetService } from '../service/password-reset.service';
import { PasswordResetTokenRequestDTO } from './dto/password-reset-token-request.dto';
import { PasswordUpdateRequestDTO } from './dto/password-update-request.dto';
export declare class PasswordResetController {
    private readonly passwordResetService;
    constructor(passwordResetService: PasswordResetService);
    generateToken(passwordResetTokenRequestDTO: PasswordResetTokenRequestDTO): Promise<{
        data: ResetTokenInterface;
    }>;
    updatePassword(passwordUpdateRequestDTO: PasswordUpdateRequestDTO): Promise<void>;
}
