import { IsNotEmpty, IsString } from 'class-validator';

// 导出PasswordResetTokenRequestDTO类，包含userId属性，使用class-validator库中的IsString和IsNotEmpty验证器
export class PasswordResetTokenRequestDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
