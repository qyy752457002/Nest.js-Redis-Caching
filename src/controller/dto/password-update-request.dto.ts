import { IsString } from 'class-validator';

// 导出PasswordUpdateRequestDTO类，该类包含userId、password和token三个字段
export class PasswordUpdateRequestDTO {
  // 验证userId字段是否为字符串类型
  @IsString()
  userId: string;

  // 验证password字段是否为字符串类型
  @IsString()
  password: string;

  // 验证token字段是否为字符串类型
  @IsString()
  token: string;
}
